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

const forum = new Forum([
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

forum.touchField('pineapple');

forum.onChange('orange', (field) => {
    console.log(`orange is valid: ${field.valid}, error: ${field.errors}`);
});

forum.validateField('orange');

model.orange = 1;

forum.validate();

