import { required, Validator } from "./validators";

import Forum from './forum'

let model = {
    pineapple: false,
    orange: 4
};

const greaterThanOne: Validator = {
    getError: () => 'The value must be greater than 1.',
    validate: (value) => value > 1
};

const form: Forum = new Forum([
    {
        name: 'pineapple',
        model: () => model.pineapple,
        validators: [
            required
        ],
        onChange: [
            (field) => console.log(`field pineapple changed: is touched ${field.touched}`)
        ]
    },
    {
        name: 'orange',
        model: () => model.orange,
        validators: [
            greaterThanOne
        ],
        onChange: []
    }
]);

form.touchField('pineapple');

form.onChange('orange', (field) => {
    console.log(`orange is valid: ${field.valid}, error: ${field.errors}`);
});

form.validateField('orange');

model.orange = 1;

form.validate();

