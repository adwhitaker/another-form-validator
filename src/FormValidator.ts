import { Validator } from "./validators"

export interface FieldOptions {
    name: string
    touched: boolean
    dirty: boolean
    valid: boolean
    errors: string[]
}

export type OnChangeCallback = (field: FieldOptions) => void

export type Field = {
    name: string
    model: () => any
    touched: boolean
    dirty: boolean
    valid: boolean
    validators: Validator[]
    errors: string[]
    onChange: OnChangeCallback[]
}

export interface FieldRegister {
    name: string
    model: () => any
    validators: Validator[]
    onChange: OnChangeCallback[]
}

type FieldObject = { [key: string]: Field }

export default class FormValidator {

    private fields: FieldObject = {}

    private isValid: boolean = true

    private validitySubscribers: Array<(isValid: boolean) => void> = []

    constructor(fields: FieldRegister[] = []) {
        fields.forEach((field: Field) => {
            this.fields[field.name] = this.formatField(field)
        })
    }

    public getFieldState(fieldName: string): FieldOptions {
        let field: Field = this.fields[fieldName]
        if (field) {
            return this.formatCallbackParams(field)
        }
    }

    public onChange(fieldName: string, callback: OnChangeCallback): void {
        let field: Field = this.fields[fieldName]
        if (field) {
            field.onChange.push(callback)
        }
    }

    public registerField(field: FieldRegister): void {
        this.fields[field.name] = this.formatField(field)
    }

    public unregisterField(fieldName: string): void {
        delete this.fields[fieldName]
    }

    public dirty(fieldName: string): void {
        let field: Field = this.fields[fieldName]
        if (field) {
            field.dirty = true
            this.validateField(fieldName)
        }
    }

    public dirtyAll(): void {
        Object.keys(this.fields).forEach((key: string) => {
            let field: Field = this.fields[key]
            field.dirty = true

            field.onChange.forEach((callback: OnChangeCallback) => {
                const params: FieldOptions = this.formatCallbackParams(field)
                callback(params)
            })
        })
    }

    public touchAll(): void {
        Object.keys(this.fields).forEach((key: string) => {
            let field: Field = this.fields[key]
            field.touched = true

            field.onChange.forEach((callback: OnChangeCallback) => {
                const params: FieldOptions = this.formatCallbackParams(field)
                callback(params)
            })
        })
    }

    public touch(fieldName: string): void {
        const field: Field = this.fields[fieldName]
        if (field) {
            field.touched = true
            this.validateField(fieldName)
        }
    }

    public reset(): void {
        Object.keys(this.fields)
            .forEach((key: string) => {
                let field: Field = this.fields[key]
                if (field) {
                    field.touched = false
                    field.dirty = false
                    field.valid = true
                }
            })
    }

    public registerValidator(fieldName: string, validator: Validator): void {
        let field: Field = this.fields[fieldName]
        if (field) {
            field.validators.push(validator)
        }
    }

    public validate(): boolean {
        let isValid: boolean = true

        Object.keys(this.fields)
            .forEach((key: string) => {
                const fieldIsValid: boolean = this.validateField(key)
                if (!fieldIsValid) {
                    isValid = false
                }
            })

        this.updateFormValidity(isValid)
        return isValid
    }

    public validateField(fieldName: string): boolean {
        let valid: boolean = true
        let errors: string[] = []
        const field: Field | null = this.fields[fieldName]

        if (field) {
            field.validators.forEach(validator => {
                const isValid: boolean = validator.validate(field.model())

                if (!isValid) {
                    valid = false
                    errors.push(validator.getError(field.model()))
                }
            })

            field.valid = valid
            field.errors = errors

            field.onChange.forEach((callback: OnChangeCallback) => {
                const params: FieldOptions = this.formatCallbackParams(field)
                callback(params)
            })

            return field.valid
        }
    }

    public validitySubscriber(callback: (isValid: boolean) => void) {
        this.validitySubscribers.push(callback)
    }

    private formatCallbackParams(field: Field): FieldOptions {
        return {
            name: field.name,
            touched: field.touched,
            dirty: field.dirty,
            valid: field.valid,
            errors: field.errors
        }
    }

    private formatField(field: FieldRegister): Field {
        return {
            name: field.name,
            model: field.model,
            touched: false,
            dirty: false,
            valid: true,
            errors: [],
            validators: field.validators,
            onChange: field.onChange
        }
    }

    private updateFormValidity(valid: boolean): void {
        this.isValid = valid
        this.validitySubscribers.forEach(callback => callback(this.isValid))
    }
}
