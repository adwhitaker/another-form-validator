import { required, Validator } from "./validators";

import Forum from '.'

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

form.validitySubscriber((isValid) => {
    console.log('subscriber: Form is valid:', isValid, 'enabled submit?', isValid);
});

form.touch('pineapple');

form.onChange('orange', (field) => {
    if (field.dirty && !field.valid) {
        console.log('orange is invalid, display error message')
    }
});

form.validateField('orange');

model.orange = 1;
form.dirty('orange');

form.validate();

model.orange = 4;
form.validate();