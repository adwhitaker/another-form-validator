"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Forum = /** @class */ (function () {
    function Forum(fields) {
        if (fields === void 0) { fields = []; }
        var _this = this;
        this.fields = {};
        this.isValid = true;
        this.validitySubscribers = [];
        fields.forEach(function (field) {
            _this.fields[field.name] = _this.formatField(field);
        });
    }
    Forum.prototype.getFieldState = function (fieldName) {
        var field = this.fields[fieldName];
        if (field) {
            return this.formatCallbackParams(field);
        }
    };
    Forum.prototype.onChange = function (fieldName, callback) {
        var field = this.fields[fieldName];
        if (field) {
            field.onChange.push(callback);
        }
    };
    Forum.prototype.registerField = function (field) {
        this.fields[field.name] = this.formatField(field);
    };
    Forum.prototype.unregisterField = function (fieldName) {
        delete this.fields[fieldName];
    };
    Forum.prototype.dirty = function (fieldName) {
        var field = this.fields[fieldName];
        if (field) {
            field.dirty = true;
            this.validateField(fieldName);
        }
    };
    Forum.prototype.dirtyAll = function () {
        var _this = this;
        Object.keys(this.fields).forEach(function (key) {
            var field = _this.fields[key];
            field.dirty = true;
            field.onChange.forEach(function (callback) {
                var params = _this.formatCallbackParams(field);
                callback(params);
            });
        });
    };
    Forum.prototype.touchAll = function () {
        var _this = this;
        Object.keys(this.fields).forEach(function (key) {
            var field = _this.fields[key];
            field.touched = true;
            field.onChange.forEach(function (callback) {
                var params = _this.formatCallbackParams(field);
                callback(params);
            });
        });
    };
    Forum.prototype.touch = function (fieldName) {
        var field = this.fields[fieldName];
        if (field) {
            field.touched = true;
            this.validateField(fieldName);
        }
    };
    Forum.prototype.reset = function () {
        var _this = this;
        Object.keys(this.fields)
            .forEach(function (key) {
            var field = _this.fields[key];
            if (field) {
                field.touched = false;
                field.dirty = false;
                field.valid = true;
            }
        });
    };
    Forum.prototype.registerValidator = function (fieldName, validator) {
        var field = this.fields[fieldName];
        if (field) {
            field.validators.push(validator);
        }
    };
    Forum.prototype.validate = function () {
        var _this = this;
        var isValid = true;
        Object.keys(this.fields)
            .forEach(function (key) {
            var fieldIsValid = _this.validateField(key);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        this.updateFormValidity(isValid);
        return isValid;
    };
    Forum.prototype.validateField = function (fieldName) {
        var _this = this;
        var valid = true;
        var errors = [];
        var field = this.fields[fieldName];
        if (field) {
            field.validators.forEach(function (validator) {
                var isValid = validator.validate(field.model());
                if (!isValid) {
                    valid = false;
                    errors.push(validator.getError(field.model()));
                }
            });
            field.valid = valid;
            field.errors = errors;
            field.onChange.forEach(function (callback) {
                var params = _this.formatCallbackParams(field);
                callback(params);
            });
            return field.valid;
        }
    };
    Forum.prototype.validitySubscriber = function (callback) {
        this.validitySubscribers.push(callback);
    };
    Forum.prototype.formatCallbackParams = function (field) {
        return {
            name: field.name,
            touched: field.touched,
            dirty: field.dirty,
            valid: field.valid,
            errors: field.errors
        };
    };
    Forum.prototype.formatField = function (field) {
        return {
            name: field.name,
            model: field.model,
            touched: false,
            dirty: false,
            valid: true,
            errors: [],
            validators: field.validators,
            onChange: field.onChange
        };
    };
    Forum.prototype.updateFormValidity = function (valid) {
        var _this = this;
        this.isValid = valid;
        this.validitySubscribers.forEach(function (callback) { return callback(_this.isValid); });
    };
    return Forum;
}());
exports.default = Forum;
//# sourceMappingURL=forum.js.map