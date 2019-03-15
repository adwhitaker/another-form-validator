import { Validator } from "./validators";
interface FieldOptions {
    name: string;
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    errors: string[];
}
declare type OnChangeCallback = (field: FieldOptions) => void;
declare type Field = {
    name: string;
    model: () => any;
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    validators: Validator[];
    errors: string[];
    onChange: OnChangeCallback[];
};
interface FieldRegister {
    name: string;
    model: () => any;
    validators: Validator[];
    onChange: OnChangeCallback[];
}
interface IForum {
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
export default class Forum implements IForum {
    private fields;
    private isValid;
    private validitySubscribers;
    constructor(fields?: FieldRegister[]);
    onChange(fieldName: string, callback: OnChangeCallback): void;
    registerField(field: Field): void;
    unregisterField(fieldName: string): void;
    dirty(fieldName: string): void;
    touchAll(): void;
    touch(fieldName: string): void;
    reset(): void;
    registerValidator(fieldName: string, validator: Validator): void;
    validate(): boolean;
    validateField(fieldName: string): boolean;
    validitySubscriber(callback: (isValid: boolean) => void): void;
    private formatCallbackParams;
    private formatField;
    private updateFormValidity;
}
export {};
