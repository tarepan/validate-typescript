"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Either_1 = require("fp-ts/lib/Either");
var assert = require("./assertions");
var sym = require("./symbols");
var common_1 = require("./common");
var errors_1 = require("./errors");
var validators_1 = require("./validators");
var assertions_1 = require("./assertions");
/**
 * Validator where the schema is an object. This is used, specifically for validating
 * null, array and object types.
 *
 * For null validation, the value must match the schema value of null.
 *
 * For array validation each element of the array needs to be successfully validated. Multiple
 * schemas can be provided but only one of them neds to succeed. Synonymous to the "any"
 * validator.
 *
 * For object validation, all the properties provided in the schema need to be provided in the
 * value object. To be validated, all the properties need to be validated successfully.
 * @param {T} schema The validation schema (object).
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {T} When validation succeeds.
 * @throws {ValidatorError} When validation fails.
 */
function ValidateObject(schema, value, property) {
    // Null Validation
    if (common_1.isNull(schema)) {
        Null(schema, value, property);
        return value;
    }
    // Array Validation
    // @throw ValidatorError | MultipleValidationError (both extends ValidationError)
    if (Array.isArray(schema)) {
        // Ensure that the value is an array.
        try {
            assert.isArray(value);
        }
        catch (error) {
            throw new errors_1.ValidatorError(Array.name, property, value, error);
        }
        var array_error = new errors_1.MultipleValidationError(value);
        var idx_schema = schema.length > 1 ? validators_1.Any(schema) : schema[0];
        // Validate each element of the array.
        for (var element_idx = 0; element_idx < value.length; element_idx++) {
            var sub_property = property + "[" + element_idx + "]";
            try {
                value[element_idx] = ValidateRecursive(idx_schema, value[element_idx], sub_property);
            }
            catch (error) {
                array_error.child_errors.push(error);
            }
        }
        if (array_error.child_errors.length > 0) {
            throw array_error;
        }
    }
    // Object Validation
    // @throw ValidatorError | MultipleValidationError (both extends ValidationError)
    else {
        // Ensure that the value is an object.
        try {
            assert.isObject(value);
            assert.isNull(value, assertions_1.INVERT);
            assert.isArray(value, assertions_1.INVERT);
        }
        catch (error) {
            throw new errors_1.ValidatorError(Object.name, property, value, error);
        }
        var object_error = new errors_1.MultipleValidationError(value);
        // Validate the fields of the object.
        for (var _i = 0, _a = Object.getOwnPropertyNames(schema); _i < _a.length; _i++) {
            var field = _a[_i];
            try {
                value[field] = ValidateRecursive(schema[field], value[field], property + "." + field);
            }
            catch (error) {
                object_error.child_errors.push(error);
            }
        }
        if (object_error.child_errors.length > 0) {
            throw object_error;
        }
    }
    return value;
}
exports.ValidateObject = ValidateObject;
/**
 * Validator where the schema is a function. This is used, specifically for validating based on
 * type, multiple schema options and custom validators. The function serves as a wrapper to
 * simplify the API.
 *
 * For type validation, the class name of the value must match the class name of the schema.
 *
 * For options validation, an array of schemas are provided. If the option is any, then only one
 * of the schemas need to match to validate successfully. If the option is all, then all of the
 * schemas need to match to validate successfully.
 *
 * For custom validator validation, the custom validator function is called with the value and
 * property as parameters.
 * @param {T} schema The validation schema (function).
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {T} When validation succeeds.
 * @throws {ValidatorError} When validation fails.
 */
function ValidateFunction(schema, value, property) {
    // Type Validation
    if (schema[sym.Validator] === sym.TypeValidator) {
        var type_name = schema[sym.TypeValidator];
        try {
            assert.isSameTypeName(type_name, common_1.objectType(value));
        }
        catch (error) {
            throw new errors_1.ValidatorError(type_name, property, value, error);
        }
    }
    // Options Validation
    else if (schema[sym.Validator] === sym.OptionsValidator) {
        var schemas = schema[sym.OptionsValidator].schemas;
        var option = schema[sym.OptionsValidator]
            .option;
        var option_name = schema[sym.Metadata].name;
        var match_error = new errors_1.NotMatchAnyError(value);
        // Check each schema if (ALL); Check first valid schema (ANY).
        for (var schema_idx = 0; schema_idx < schemas.length; schema_idx++) {
            try {
                value = ValidateRecursive(schemas[schema_idx], value, property);
                if (option === validators_1.ValidationOptions.any) {
                    match_error.child_errors = [];
                    break;
                }
            }
            catch (error) {
                match_error.child_errors[schema_idx] = error;
            }
        }
        if (match_error.child_errors.length > 0) {
            throw new errors_1.ValidatorError(option_name, property, value, match_error);
        }
    }
    // Custom Validator Validation
    else if (schema[sym.Validator] === sym.CustomValidator) {
        var validator_name = schema[sym.Metadata].name;
        try {
            value = schema[sym.CustomValidator](value, property);
        }
        catch (error) {
            throw new errors_1.ValidatorError(validator_name, property, value, error);
        }
    }
    // Validator Function (not supported)
    else
        Unknown(schema, value, property);
    return value;
}
exports.ValidateFunction = ValidateFunction;
/**
 * Validator where the schema is a literal string, thus the variable (value) is expected to be a
 * string and have the same string value as the schema.
 * @param {string} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {string} When validation succeeds.
 * @throws {ValidatorError} When the value is either not a string or the string value differs
 * from that of the schema (failed validation).
 */
function LiteralString(schema, value, property) {
    try {
        assert.isString(value);
        assert.isEqual(schema, value);
    }
    catch (error) {
        throw new errors_1.ValidatorError(LiteralString.name, property, value, error);
    }
    return value;
}
exports.LiteralString = LiteralString;
/**
 * Validator where the schema is a literal number, thus the variable (value) is expected to be a
 * number and have the same numeric value as the schema.
 * @param {number} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {number} When validation succeeds.
 * @throws {ValidatorError} When the value is either not a number or the numeric value differs
 * from that of the schema (failed validation).
 */
function LiteralNumber(schema, value, property) {
    try {
        assert.isNumber(value);
        assert.isEqual(schema, value);
    }
    catch (error) {
        throw new errors_1.ValidatorError(LiteralNumber.name, property, value, error);
    }
    return value;
}
exports.LiteralNumber = LiteralNumber;
/**
 * Validator where the schema is a literal boolean, thus the variable (value) is expected to be a
 * boolean and have the same boolean value as the schema.
 * @param {boolean} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {boolean} When validation succeeds.
 * @throws {ValidatorError} When the value is either not a boolean or the boolean value differs
 * from that of the schema (failed validation).
 */
function LiteralBoolean(schema, value, property) {
    try {
        assert.isBoolean(value);
        assert.isEqual(schema, value);
    }
    catch (error) {
        throw new errors_1.ValidatorError(LiteralBoolean.name, property, value, error);
    }
    return value;
}
exports.LiteralBoolean = LiteralBoolean;
/**
 * Validator where the schema is a literal symbol, thus the variable (value) is expected to be a
 * symbol and have the same symbolic value as the schema.
 * @param {symbol} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {symbol} When validation succeeds.
 * @throws {ValidatorError} When the value is either not a symbol or the symbolic value differs
 * from that of the schema (failed validation).
 */
function LiteralSymbol(schema, value, property) {
    try {
        assert.isSymbol(value);
        assert.isEqual(schema, value);
    }
    catch (error) {
        throw new errors_1.ValidatorError(LiteralSymbol.name, property, value, error);
    }
    return value;
}
exports.LiteralSymbol = LiteralSymbol;
/**
 * Validator where the schema is undefined, thus the variable (value) is expected to be undefined
 * too.
 * @param {undefined} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {undefined} When validation succeeds.
 * @throws {ValidatorError} When the value is not undefined (failed validation).
 */
function Undefined(schema, value, property) {
    try {
        assert.isUndefined(value);
    }
    catch (error) {
        throw new errors_1.ValidatorError(Undefined.name, property, value, error);
    }
    return value;
}
exports.Undefined = Undefined;
/**
 * Validator where the schema is null, thus the variable (value) is expected to be null too.
 * @param {null} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {null} When validation succeeds.
 * @throws {ValidatorError} When the value is not null (failed validation).
 */
function Null(schema, value, property) {
    try {
        assert.isNull(value);
    }
    catch (error) {
        throw new errors_1.ValidatorError(Null.name, property, value, error);
    }
    return value;
}
exports.Null = Null;
/**
 * Validator where the schema has a native type that has not been catered for.
 * @param {T} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @throws {ValidatorError} This caters for the scenario where a native type is not catered for.
 */
function Unknown(schema, value, property) {
    throw new errors_1.ValidatorError(Unknown.name, property, value, new Error("Unable to validate unknown type."));
}
exports.Unknown = Unknown;
/**
 * Internal method to select the appropriate validation scheme, base on the native type of the
 * variable (value).
 * @param {T} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {T} The original value cast to type T if validation succeeded, else an error is
 * thrown.
 */
function ValidateRecursive(schema, value, property) {
    switch (typeof schema) {
        case "object":
            return ValidateObject(schema, value, property);
        case "function":
            return ValidateFunction(schema, value, property);
        case "string":
            //@ts-ignore
            return LiteralString(schema, value, property);
        case "number":
            //@ts-ignore
            return LiteralNumber(schema, value, property);
        case "boolean":
            //@ts-ignore
            return LiteralBoolean(schema, value, property);
        case "symbol":
            //@ts-ignore
            return LiteralSymbol(schema, value, property);
        case "undefined":
            //@ts-ignore
            return Undefined(schema, value, property);
        default:
            return Unknown(schema, value, property);
    }
}
/**
 * Validates a variable (value) according to a validation schema (type T).
 * @param schema - The validation schema.
 * @param value - Variable (value) to be validated.
 * @param name - Name of the variable (value) being validated, for detailed logging.
 * @param {Function(string)} log Validation error logger, takes a string input.
 * @returns The original value cast to type T if validation succeeded.
 * @throws Validation error.
 */
function validate(schema, value, name, log) {
    if (name === void 0) { name = ""; }
    if (log === void 0) { log = console.log; }
    try {
        ValidateRecursive(schema, value, name);
    }
    catch (error) {
        if (error instanceof errors_1.ValidationError) {
            if (!common_1.isUndefined(log)) {
                log("\n" + error.trace + "\n");
            }
        }
        throw error;
    }
    return value;
}
exports.validate = validate;
/**
 * Validates a variable according to a schema.
 * @param schema - The validation schema.
 * @param value - Variable (value) to be validated.
 * @param name - Name of the variable (value) being validated, for detailed logging.
 * @param {Function(string)} log Validation error logger, takes a string input.
 * @returns Either monad which contain type-checked value or Error
 */
function validateE(schema, value, name, log) {
    if (name === void 0) { name = ""; }
    if (log === void 0) { log = console.log; }
    return Either_1.tryCatch(function () { return ValidateRecursive(schema, value, name); }, function (e) { return e; });
    // if (error instanceof ValidationError) {
    //   if (!isUndefined(log)) {
    //     log("\n" + error.trace + "\n");
    //   }
    // }
}
exports.validateE = validateE;
//# sourceMappingURL=validate.js.map