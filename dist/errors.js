"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
class ValidationError extends Error {
}
exports.ValidationError = ValidationError;
class ConversionError extends ValidationError {
    constructor(value, converter, details) {
        super();
        this.value = value;
        this.converter = converter;
        this.details = details;
        this.message = this.reason;
    }
    get reason() {
        return `${common_1.objToStr(this.value)} ${this.details} [${this.converter}].`;
    }
}
exports.ConversionError = ConversionError;
class AssertionError extends ValidationError {
    constructor(value, assertion, details) {
        super();
        this.value = value;
        this.assertion = assertion;
        this.details = details;
        this.message = this.reason;
    }
    get reason() {
        return `${common_1.objToStr(this.value)} ${this.details} [${this.assertion}].`;
    }
}
exports.AssertionError = AssertionError;
class ValidatorError extends ValidationError {
    constructor(validator, field, value, err) {
        super();
        this.validator = validator;
        this.field = field;
        this.value = value;
        this.err = err;
        this.message = this.reason;
    }
    get reason() {
        let response = `in validator [${this.validator}] on field "${this.field}".\n`;
        if (this.err instanceof ValidationError) {
            response += this.err.reason;
        }
        else {
            response += this.err.message;
        }
        return response;
    }
}
exports.ValidatorError = ValidatorError;
class NotMatchAnyError extends ValidationError {
    constructor(value) {
        super();
        this.value = value;
        this.message = this.reason;
    }
    get reason() {
        return `${common_1.objToStr(this.value)} does not match any validators.`;
    }
}
exports.NotMatchAnyError = NotMatchAnyError;
//# sourceMappingURL=errors.js.map