import { Validator } from "./validators";

interface FieldOptions {
    name: string
    touched: boolean
    dirty: boolean
    valid: boolean
    errors: string[]
}

type OnChangeCallback = (field: FieldOptions) => void;

type Field = {
    name: string
    model: () => any
    touched: boolean
    dirty: boolean
    valid: boolean
    validators: Validator[]
    errors: string[]
    onChange: OnChangeCallback[]
}

interface FieldRegister {
    name: string
    model: () => any
    validators: Validator[]
    onChange: OnChangeCallback[]
}


interface Forum {
    registerField(field: FieldRegister): void

    unregisterField(fieldName: string): void

    touchAll(): void

    touchField(fieldName: string): void

    reset(): void

    registerValidator(fieldName: string, validator: Validator): void

    validate(): boolean

    validateField(fieldName: string): boolean

    onChange(field: string, callback: OnChangeCallback): void;
}

type FieldObject = { [key: string]: Field }

class Forum implements Forum {

    private fields: FieldObject = {};

    constructor(fields: FieldRegister[] = []) {
        fields.forEach(field => {
            this.fields[field.name] = this.formatField(field)
        });
    }

    public onChange(fieldName: string, callback: OnChangeCallback): void {
        let field: Field = this.fields[fieldName];
        if (field) {
            field.onChange.push(callback);
        }
    }

    public registerField(field: Field): void {
        this.fields[field.name] = this.formatField(field)
    }

    public unregisterField(fieldName: string): void {
        delete this.fields[fieldName];
    }

    public touchAll(): void {
        Object.keys(this.fields).forEach((key: string) => {
            let field: Field = this.fields[key];
            field.touched = true;

            field.onChange.forEach((callback: OnChangeCallback) => {
                const params: FieldOptions = this.formatCallbackParams(field);
                callback(params);
            });
        });
    }

    public touchField(fieldName: string): void {
        const field: Field = this.fields[fieldName];
        if (field) {
            field.touched = true;

            field.onChange.forEach((callback: OnChangeCallback) => {
                const params: FieldOptions = this.formatCallbackParams(field);
                callback(params);
            });
        }
    }

    public reset(): void {
        Object.keys(this.fields)
            .forEach((key: string) => {
                let field: Field = this.fields[key];
                if (field) {
                    field.touched = false;
                    field.dirty = false;
                    field.valid = false;
                }
            });
    }

    public registerValidator(fieldName: string, validator: Validator): void {
        let field: Field = this.fields[fieldName];
        if (field) {
            field.validators.push(validator)
        }
    }

    public validate(): boolean {
        let isValid: boolean = true;

        Object.keys(this.fields)
            .forEach((key: string) => {
                const fieldIsValid: boolean = this.validateField(key);
                if (!fieldIsValid) {
                    isValid = false;
                }
            });

        return isValid;
    }

    public validateField(fieldName: string): boolean {
        let valid: boolean = true;
        let errors: string[] = [];
        const field: Field | null = this.fields[fieldName];

        if (field) {
            field.validators.forEach(validator => {
                const isValid: boolean = validator.validate(field.model());

                if (!isValid) {
                    valid = false;
                    errors.push(validator.getError(field.model()))
                }
            });

            field.valid = valid;
            field.errors = errors;

            field.onChange.forEach((callback: OnChangeCallback) => {
                const params: FieldOptions = this.formatCallbackParams(field);
                callback(params);
            });

            return field.valid;
        }
    }

    private formatCallbackParams(field: Field): FieldOptions {
        return {
            name: field.name,
            touched: field.touched,
            dirty: field.dirty,
            valid: field.valid,
            errors: field.errors
        };
    }

    private formatField(field: FieldRegister): Field {
        const defaultField: Field = {
            name: '',
            model: () => null,
            touched: false,
            dirty: false,
            valid: false,
            errors: [],
            validators: [],
            onChange: []
        };

        return Object.assign({}, defaultField, field);
    }
}


export default Forum

