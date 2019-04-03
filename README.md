# Another Form Validator

> A framework agnostic, customizable form validator

[![NPM Version][npm-image]][npm-url]

## Install
```bash
npm install another-form-validator
```

## Usage
```js
import FormValidator from 'another-form-validator'

let model = {
    pineapple: 1
}

const formValidator = new FormValidator()

formValidator.registerField({
    name: 'pineapple',
    model: () => model.pineapple,
    validators: [{
        getError: () => 'multiple pineapples are required',
        validate: (value) => value > 1
    }],
    onChange: [
        (field) => {
            // called on field events (touch, dirty, validate)
            if (field.errors.length) {
                const errorToDisplay = field.errors[0]
            }
        }
    ]
})

model.pineapple = 2

formValidator.touch('pineapple')
formValidator.dirty('pineapple')

const formIsValid = formValidator.validate()
console.log(formIsValid) // true
```

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/another-form-validator.svg
[npm-url]: https://npmjs.org/package/another-form-validator
