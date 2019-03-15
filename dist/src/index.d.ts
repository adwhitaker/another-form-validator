import { Validator } from "./validators";
interface FieldOptions {
    name: string;
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    errors: string[];
}
declare type OnChangeCallback = (field: FieldOptions) => void;
interface FieldRegister {
    name: string;
    model: () => any;
    validators: Validator[];
    onChange: OnChangeCallback[];
}
interface Forum {
    registerField(field: FieldRegister): void;
    unregisterField(fieldName: string): void;
    dirty(fieldName: string): void;
    touchAll(): void;
    touch(fieldName: string): void;
    reset(): void;
    registerValidator(fieldName: string, validator: Validator): void;
    validate(): boolean;
    validateField(fieldName: string): boolean;
    onChange(field: string, callback: OnChangeCallback): void;
}
declare class Forum implements Forum {
    private fields;
    private isValid;
    private validitySubscribers;
    constructor(fields?: FieldRegister[]);
    validitySubscriber(callback: (isValid: boolean) => void): void;
    private formatCallbackParams;
    private formatField;
    private updateFormValidity;
}
export default Forum;
