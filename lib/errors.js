"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var common_1 = require("./common");
/**
 * Super base class for `extends Error` TS issue
 * https://github.com/grant-zietsman/validate-typescript/issues/5
 */
var ErrorInternal = /** @class */ (function () {
    function ErrorInternal(message) {
        if (message === void 0) { message = ""; }
        this.name = "validate-typescript_ErrorInternal";
        this.message = message;
    }
    return ErrorInternal;
}());
/**
 * Base class from which validation errors are derived.
 */
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError() {
        var _this = _super.call(this) || this;
        _this.message = "Validate TypeScript";
        return _this;
    }
    Object.defineProperty(ValidationError.prototype, "trace", {
        /**
         * Error trace property (string).
         */
        get: function () {
            return this.reason();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Indentation generator.
     * @param {number} count Indentation depth.
     * @param {string} message Message to be indented.
     * @returns {string} Indentation prefix.
     */
    ValidationError.prototype.indent = function (count, message) {
        return ("\n" + message).replace(/\n/g, "\n" + "  ".repeat(count));
    };
    return ValidationError;
}(ErrorInternal));
exports.ValidationError = ValidationError;
/**
 * Error class used to express conversion errors.
 */
var ConversionError = /** @class */ (function (_super) {
    __extends(ConversionError, _super);
    function ConversionError(value, converter, details) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.converter = converter;
        _this.details = details;
        return _this;
    }
    /**
     * Explanitory conversion error string.
     * @param {number} count Error stack depth, used for indenting (string formatting).
     * @returns {string} Formatted conversion error reason.
     */
    ConversionError.prototype.reason = function (count) {
        if (count === void 0) { count = 0; }
        return (this.indent(count, chalk_1.default.yellowBright("[Conversion: " + this.converter + "]") + "\n" + chalk_1.default.bold(common_1.objectToString(this.value) + " " + this.details + ".")) + "\n");
    };
    return ConversionError;
}(ValidationError));
exports.ConversionError = ConversionError;
/**
 * Error class used to express assertion errors.
 */
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    function AssertionError(value, assertion, details) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.assertion = assertion;
        _this.details = details;
        return _this;
    }
    /**
     * Explanitory assertion error string.
     * @param {number} count Error stack depth, used for indenting (string formatting).
     * @returns {string} Formatted assertion error reason.
     */
    AssertionError.prototype.reason = function (count) {
        if (count === void 0) { count = 0; }
        return (this.indent(count, chalk_1.default.greenBright("[Assertion: " + this.assertion + "]") + "\n" + chalk_1.default.bold(common_1.objectToString(this.value) + " " + this.details + ".")) + "\n");
    };
    return AssertionError;
}(ValidationError));
exports.AssertionError = AssertionError;
/**
 * Error class used to express validator errors.
 */
var ValidatorError = /** @class */ (function (_super) {
    __extends(ValidatorError, _super);
    function ValidatorError(validator, property, value, child_error) {
        var _this = _super.call(this) || this;
        _this.validator = validator;
        _this.property = property;
        _this.value = value;
        _this.child_error = child_error;
        return _this;
    }
    /**
     * Explanitory validator error string.
     * @param count - Error stack depth, used for indenting (string formatting).
     * @returns Formatted validator error reason.
     */
    ValidatorError.prototype.reason = function (count) {
        if (count === void 0) { count = 0; }
        var response = this.indent(count, chalk_1.default.blueBright("[Validator: " + this.validator + "]") + " on property " + chalk_1.default.redBright("" + this.property));
        if (this.child_error instanceof ValidationError) {
            response += this.child_error.reason(count + 1);
        }
        return response;
    };
    return ValidatorError;
}(ValidationError));
exports.ValidatorError = ValidatorError;
/**
 * Error class used to express multiple validation errors (e.g. arrays).
 */
var MultipleValidationError = /** @class */ (function (_super) {
    __extends(MultipleValidationError, _super);
    function MultipleValidationError(value, child_errors) {
        if (child_errors === void 0) { child_errors = []; }
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.child_errors = child_errors;
        return _this;
    }
    /**
     * Explanitory validation error string.
     * @param {number} count Error stack depth, used for indenting (string formatting).
     * @returns {string} Formatted validation error reason.
     */
    MultipleValidationError.prototype.reason = function (count) {
        if (count === void 0) { count = 0; }
        var response = "";
        var max = 3;
        var more = 0;
        if (this.child_errors.length > max) {
            more = this.child_errors.length - max;
            this.child_errors = this.child_errors.slice(1, max);
        }
        for (var _i = 0, _a = this.child_errors; _i < _a.length; _i++) {
            var child_error = _a[_i];
            if (child_error instanceof ValidationError) {
                response += child_error.reason(count);
            }
        }
        if (more > 0) {
            response += this.indent(count, chalk_1.default.redBright("[+" + more + " error" + (more > 1 ? "s" : "") + "]") + "\n");
        }
        return response;
    };
    return MultipleValidationError;
}(ValidationError));
exports.MultipleValidationError = MultipleValidationError;
/**
 * Error class used to express not match any errors (e.g. optional and any validators).
 */
var NotMatchAnyError = /** @class */ (function (_super) {
    __extends(NotMatchAnyError, _super);
    function NotMatchAnyError(value, child_errors) {
        if (child_errors === void 0) { child_errors = []; }
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.child_errors = child_errors;
        return _this;
    }
    /**
     * Explanitory "not match any" error string.
     * @param {number} count Error stack depth, used for indenting (string formatting).
     * @returns {string} Formatted "not match any" error reason.
     */
    NotMatchAnyError.prototype.reason = function (count) {
        if (count === void 0) { count = 0; }
        var response = "";
        response += "\n";
        for (var _i = 0, _a = this.child_errors; _i < _a.length; _i++) {
            var child_error = _a[_i];
            if (child_error instanceof ValidationError) {
                var option = this.child_errors.indexOf(child_error) + 1;
                response += this.indent(count, chalk_1.default.magentaBright("[Option: " + option + "]") + "\n");
                response += child_error.reason(count + 1);
            }
        }
        return response;
    };
    return NotMatchAnyError;
}(ValidationError));
exports.NotMatchAnyError = NotMatchAnyError;
//# sourceMappingURL=errors.js.map