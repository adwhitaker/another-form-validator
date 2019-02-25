export type Validator = {
    getError: (value: any) => string
    validate: (value: any) => boolean
}

export const required: Validator = {
    getError: (value: any) => {
        return 'This field is required.';
    },
    validate: (value: any) => {
        return true;
    }
};
