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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/forum.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/forum.ts":
/*!**********************!*\
  !*** ./src/forum.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Forum {\n    constructor(fields = []) {\n        this.fields = {};\n        this.isValid = false;\n        this.validitySubscribers = [];\n        fields.forEach(field => {\n            this.fields[field.name] = this.formatField(field);\n        });\n    }\n    onChange(fieldName, callback) {\n        let field = this.fields[fieldName];\n        if (field) {\n            field.onChange.push(callback);\n        }\n    }\n    registerField(field) {\n        this.fields[field.name] = this.formatField(field);\n    }\n    unregisterField(fieldName) {\n        delete this.fields[fieldName];\n    }\n    dirty(fieldName) {\n        let field = this.fields[fieldName];\n        if (field) {\n            field.dirty = true;\n            field.onChange.forEach((callback) => {\n                const params = this.formatCallbackParams(field);\n                callback(params);\n            });\n        }\n    }\n    touchAll() {\n        Object.keys(this.fields).forEach((key) => {\n            let field = this.fields[key];\n            field.touched = true;\n            field.onChange.forEach((callback) => {\n                const params = this.formatCallbackParams(field);\n                callback(params);\n            });\n        });\n    }\n    touch(fieldName) {\n        const field = this.fields[fieldName];\n        if (field) {\n            field.touched = true;\n            field.onChange.forEach((callback) => {\n                const params = this.formatCallbackParams(field);\n                callback(params);\n            });\n        }\n    }\n    reset() {\n        Object.keys(this.fields)\n            .forEach((key) => {\n            let field = this.fields[key];\n            if (field) {\n                field.touched = false;\n                field.dirty = false;\n                field.valid = false;\n            }\n        });\n    }\n    registerValidator(fieldName, validator) {\n        let field = this.fields[fieldName];\n        if (field) {\n            field.validators.push(validator);\n        }\n    }\n    validate() {\n        let isValid = true;\n        Object.keys(this.fields)\n            .forEach((key) => {\n            const fieldIsValid = this.validateField(key);\n            if (!fieldIsValid) {\n                isValid = false;\n            }\n        });\n        this.updateFormValidity(isValid);\n        return isValid;\n    }\n    validateField(fieldName) {\n        let valid = true;\n        let errors = [];\n        const field = this.fields[fieldName];\n        if (field) {\n            field.validators.forEach(validator => {\n                const isValid = validator.validate(field.model());\n                if (!isValid) {\n                    valid = false;\n                    errors.push(validator.getError(field.model()));\n                }\n            });\n            field.valid = valid;\n            field.errors = errors;\n            field.onChange.forEach((callback) => {\n                const params = this.formatCallbackParams(field);\n                callback(params);\n            });\n            return field.valid;\n        }\n    }\n    validitySubscriber(callback) {\n        this.validitySubscribers.push(callback);\n    }\n    formatCallbackParams(field) {\n        return {\n            name: field.name,\n            touched: field.touched,\n            dirty: field.dirty,\n            valid: field.valid,\n            errors: field.errors\n        };\n    }\n    formatField(field) {\n        const defaultField = {\n            name: '',\n            model: () => null,\n            touched: false,\n            dirty: false,\n            valid: false,\n            errors: [],\n            validators: [],\n            onChange: []\n        };\n        return Object.assign({}, defaultField, field);\n    }\n    updateFormValidity(valid) {\n        this.isValid = valid;\n        this.validitySubscribers.forEach(callback => callback(this.isValid));\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (Forum);\n\n\n//# sourceURL=webpack:///./src/forum.ts?");

/***/ })

/******/ });