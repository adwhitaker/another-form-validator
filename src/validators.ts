export type Validator = {
    getError: () => string
    validate: (value: any) => boolean
}

export const required: Validator = {
    getError: () => {
        return 'This field is required.';
    },
    validate: (value: any) => {
        return true;
    }
};
