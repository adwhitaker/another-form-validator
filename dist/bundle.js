/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Forum = /** @class */ (function () {\n    function Forum(fields) {\n        if (fields === void 0) { fields = []; }\n        var _this = this;\n        this.fields = {};\n        this.isValid = false;\n        this.validitySubscribers = [];\n        fields.forEach(function (field) {\n            _this.fields[field.name] = _this.formatField(field);\n        });\n    }\n    Forum.prototype.onChange = function (fieldName, callback) {\n        var field = this.fields[fieldName];\n        if (field) {\n            field.onChange.push(callback);\n        }\n    };\n    Forum.prototype.registerField = function (field) {\n        this.fields[field.name] = this.formatField(field);\n    };\n    Forum.prototype.unregisterField = function (fieldName) {\n        delete this.fields[fieldName];\n    };\n    Forum.prototype.dirty = function (fieldName) {\n        var _this = this;\n        var field = this.fields[fieldName];\n        if (field) {\n            field.dirty = true;\n            field.onChange.forEach(function (callback) {\n                var params = _this.formatCallbackParams(field);\n                callback(params);\n            });\n        }\n    };\n    Forum.prototype.touchAll = function () {\n        var _this = this;\n        Object.keys(this.fields).forEach(function (key) {\n            var field = _this.fields[key];\n            field.touched = true;\n            field.onChange.forEach(function (callback) {\n                var params = _this.formatCallbackParams(field);\n                callback(params);\n            });\n        });\n    };\n    Forum.prototype.touch = function (fieldName) {\n        var _this = this;\n        var field = this.fields[fieldName];\n        if (field) {\n            field.touched = true;\n            field.onChange.forEach(function (callback) {\n                var params = _this.formatCallbackParams(field);\n                callback(params);\n            });\n        }\n    };\n    Forum.prototype.reset = function () {\n        var _this = this;\n        Object.keys(this.fields)\n            .forEach(function (key) {\n            var field = _this.fields[key];\n            if (field) {\n                field.touched = false;\n                field.dirty = false;\n                field.valid = false;\n            }\n        });\n    };\n    Forum.prototype.registerValidator = function (fieldName, validator) {\n        var field = this.fields[fieldName];\n        if (field) {\n            field.validators.push(validator);\n        }\n    };\n    Forum.prototype.validate = function () {\n        var _this = this;\n        var isValid = true;\n        Object.keys(this.fields)\n            .forEach(function (key) {\n            var fieldIsValid = _this.validateField(key);\n            if (!fieldIsValid) {\n                isValid = false;\n            }\n        });\n        this.updateFormValidity(isValid);\n        return isValid;\n    };\n    Forum.prototype.validateField = function (fieldName) {\n        var _this = this;\n        var valid = true;\n        var errors = [];\n        var field = this.fields[fieldName];\n        if (field) {\n            field.validators.forEach(function (validator) {\n                var isValid = validator.validate(field.model());\n                if (!isValid) {\n                    valid = false;\n                    errors.push(validator.getError(field.model()));\n                }\n            });\n            field.valid = valid;\n            field.errors = errors;\n            field.onChange.forEach(function (callback) {\n                var params = _this.formatCallbackParams(field);\n                callback(params);\n            });\n            return field.valid;\n        }\n    };\n    Forum.prototype.validitySubscriber = function (callback) {\n        this.validitySubscribers.push(callback);\n    };\n    Forum.prototype.formatCallbackParams = function (field) {\n        return {\n            name: field.name,\n            touched: field.touched,\n            dirty: field.dirty,\n            valid: field.valid,\n            errors: field.errors\n        };\n    };\n    Forum.prototype.formatField = function (field) {\n        var defaultField = {\n            name: '',\n            model: function () { return null; },\n            touched: false,\n            dirty: false,\n            valid: false,\n            errors: [],\n            validators: [],\n            onChange: []\n        };\n        return Object.assign({}, defaultField, field);\n    };\n    Forum.prototype.updateFormValidity = function (valid) {\n        var _this = this;\n        this.isValid = valid;\n        this.validitySubscribers.forEach(function (callback) { return callback(_this.isValid); });\n    };\n    return Forum;\n}());\nexports.default = Forum;\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });