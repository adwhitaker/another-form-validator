import { Validator } from "./validators";
export interface FieldOptions {
    name: string;
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    errors: string[];
}
export declare type OnChangeCallback = (field: FieldOptions) => void;
export declare type Field = {
    name: string;
    model: () => any;
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    validators: Validator[];
    errors: string[];
    onChange: OnChangeCallback[];
};
export interface FieldRegister {
    name: string;
    model: () => any;
    validators: Validator[];
    onChange: OnChangeCallback[];
}
export default class Forum {
    private fields;
    private isValid;
    private validitySubscribers;
    constructor(fields?: FieldRegister[]);
    getFieldState(fieldName: string): FieldOptions;
    onChange(fieldName: string, callback: OnChangeCallback): void;
    registerField(field: FieldRegister): void;
    unregisterField(fieldName: string): void;
    dirty(fieldName: string): void;
    dirtyAll(): void;
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
