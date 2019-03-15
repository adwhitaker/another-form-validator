"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("./validators");
var _1 = require(".");
var model = {
    pineapple: false,
    orange: 4
};
var greaterThanOne = {
    getError: function () { return 'The value must be greater than 1.'; },
    validate: function (value) { return value > 1; }
};
var form = new _1.default([
    {
        name: 'pineapple',
        model: function () { return model.pineapple; },
        validators: [
            validators_1.required
        ],
        onChange: [
            function (field) { return console.log("field pineapple changed: is touched " + field.touched); }
        ]
    },
    {
        name: 'orange',
        model: function () { return model.orange; },
        validators: [
            greaterThanOne
        ],
        onChange: []
    }
]);
form.validitySubscriber(function (isValid) {
    console.log('subscriber: Form is valid:', isValid, 'enabled submit?', isValid);
});
form.touch('pineapple');
form.onChange('orange', function (field) {
    if (field.dirty && !field.valid) {
        console.log('orange is invalid, display error message');
    }
});
form.validateField('orange');
model.orange = 1;
form.dirty('orange');
form.validate();
model.orange = 4;
form.validate();
//# sourceMappingURL=test.js.map