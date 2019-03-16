export type Validator = {
    getError: (value: any) => string
    validate: (value: any) => boolean
}
