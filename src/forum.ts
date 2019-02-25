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
    touched: boolean
    dirty: boolean
    valid: boolean
    validators: string[]
    errors: string[]
    onChange: OnChangeCallback[]
}

interface FieldRegister {
    name: string
    validators: string[]
    onChange: OnChangeCallback[]
}


interface Forum {
    registerField(field: Field): void

    unregisterField(fieldName: string): void

    touchAll(): void

    touchField(fieldName: string): void

    reset(): void

    registerValidator(): void

    validate(): FieldOptions

    validateField(fieldName: string): FieldOptions

    onChange(field: string, callback: OnChangeCallback): void;
}

class Forum implements Forum {

    private fields: Field[];

    constructor(fields: FieldRegister[] = []) {
        this.fields = fields.map((field: FieldRegister) => this.formatField(field));
    }

    public onChange(fieldName: string, callback: OnChangeCallback): void {
        let field = this.findField(fieldName);
        if (field) {
            field.onChange.push(callback);
        }
    }

    public registerField(field: FieldRegister): void {
        const newField = this.formatField(field);
        this.fields.push(newField);
    }

    public unregisterField(fieldName: string): void {

    }

    public touchAll(): void {
        this.fields.forEach((field: Field) => {
            field.touched = true;
            field.onChange.forEach(onChange => {
                const params: FieldOptions = this.formatCallbackParams(field);
                onChange(params);
            });
        });
    }

    public touchField(fieldName: string): void {
        const field = this.findField(fieldName);
        if (field) {
            field.touched = true;
            field.onChange.forEach(callback => {
                const params: FieldOptions = this.formatCallbackParams(field);
                callback(params);
            });
        }

    }

    public reset(): void {

    }

    public registerValidator(): void {

    }

    public validate(): FieldOptions {
        return undefined;
    }

    public validateField(fieldName: string): FieldOptions {
        return undefined;
    }

    private findField(fieldName: string): Field | null {
        return this.fields.find((field: Field) => field.name === fieldName);
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


const forum = new Forum([
    {
        name: 'pineapple',
        validators: ['required'],
        onChange: [
            (field) => console.log(`field pineapple changed: is touched ${ field.touched }`)
        ]
    },
    {
        name: 'orange',
        validators: ['required'],
        onChange: [
            (field) => console.log(`field orange changed: is touched ${ field.touched }`)
        ]
    }
]);

forum.touchField('pineapple');

export default Forum;