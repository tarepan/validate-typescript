"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sym = require("./symbols");
var assert = require("./assertions");
var convert = require("./conversions");
var common_1 = require("./common");
var ValidationOptions;
(function (ValidationOptions) {
    ValidationOptions[ValidationOptions["any"] = 0] = "any";
    ValidationOptions[ValidationOptions["all"] = 1] = "all";
})(ValidationOptions = exports.ValidationOptions || (exports.ValidationOptions = {}));
/**
 * Validator that checks that the value provided is a primitive type.
 * @param {() => T} ctor Primitive type constructor (e.g. String).
 * @param {string} name Optional override of the validator name.
 */
function Primitive(ctor, name) {
    if (name === void 0) { name = Primitive.name; }
    return Type(ctor, name);
}
exports.Primitive = Primitive;
/**
 * Validator that checks that the value provided is of the specified type.
 * @param {() => A | () => B} ctor Type constructor (e.g. MyOwnClass).
 * @param {string} name Optional override of the validator name.
 * @todo Try simplify ctor type.
 */
function Type(ctor, name) {
    if (name === void 0) { name = Type.name; }
    if (common_1.isNullOrUndefined(ctor) || common_1.isNullOrUndefined(ctor.prototype))
        throw new Error("Schema error, not a valid type.");
    var result = (function () { });
    result[sym.Validator] = sym.TypeValidator;
    result[sym.TypeValidator] = ctor.prototype.constructor.name;
    result[sym.Metadata] = { name: name };
    return result;
}
exports.Type = Type;
/**
 * Validator that supports multiple schemas.
 *
 * The any or all option is used to ensure that only one or all of the schemas need to validate
 * successfully.
 * @param {T[]} schemas Multiple validation schemas.
 * @param {string} name Optional override of the validator name.
 * @param {ValidationOptions} option Selects all/any validation.
 */
function Options(schemas, name, option) {
    if (name === void 0) { name = Options.name; }
    if (option === void 0) { option = ValidationOptions.any; }
    var result = (function () { });
    result[sym.Validator] = sym.OptionsValidator;
    result[sym.OptionsValidator] = { schemas: schemas, option: option };
    result[sym.Metadata] = { name: name };
    return result;
}
exports.Options = Options;
/**
 * Shorthand variant of Options with the option field set to any.
 * @param {T[]} schemas Multiple validation schemas.
 * @param {string} name Optional override of the validator name.
 */
function Any(schemas, name) {
    if (name === void 0) { name = Any.name; }
    return Options(schemas, name, ValidationOptions.any);
}
exports.Any = Any;
/**
 * Shorthand variant of Options with the option field set to all.
 * @param {T[]} schemas Multiple validation schemas.
 * @param {string} name Optional override of the validator name.
 */
function All(schemas, name) {
    if (name === void 0) { name = All.name; }
    return Options(schemas, name, ValidationOptions.all);
}
exports.All = All;
/**
 * Validator that is with an optional schema. Validation will succeed if undefined is passed as a
 * value.
 * @param {T} schema Validation schemas.
 * @param {string} name Optional override of the validator name.
 */
function Optional(schema, name) {
    if (name === void 0) { name = Optional.name; }
    return Options([schema, undefined], name);
}
exports.Optional = Optional;
/**
 * Validator that is with a nullable schema. Validation will succeed if null is passed as a value.
 * @param {T} schema Validation schemas.
 * @param {string} name Optional override of the validator name.
 */
function Nullable(schema, name) {
    if (name === void 0) { name = Nullable.name; }
    return Options([schema, null], name);
}
exports.Nullable = Nullable;
/**
 * Wrapper for a custom validator.
 * @param {ValidationMethod<T>} method Custom validator method.
 * @param {string} name Optional override of the validator name.
 */
function Validator(method, name) {
    if (name === void 0) { name = Validator.name; }
    var result = (function () { });
    result[sym.Validator] = sym.CustomValidator;
    result[sym.CustomValidator] = method;
    result[sym.Metadata] = { name: name };
    return result;
}
exports.Validator = Validator;
/**
 * Wrapper that can be reused to rename a validator.
 * @param {T} validator Validator.
 * @param {string} name Validator name override.
 */
function Alias(validator, name) {
    if (name === void 0) { name = Alias.name; }
    validator[sym.Metadata].name = name;
    return validator;
}
exports.Alias = Alias;
/**
 * RFC 5322 based email address validator.
 * @see https://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
 */
function Email() {
    return Alias(RegEx(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/), Email.name);
}
exports.Email = Email;
/**
 * Numerical ID validator (integer greater than 0).
 */
function ID() {
    return Validator(function (input) {
        var value = convert.toInt(input);
        assert.isGreaterThan(0, value);
        return value;
    }, ID.name);
}
exports.ID = ID;
/**
 * RegEx string match validator.
 * @param {boolean} conversion Optional conversion.
 */
function RegEx(regEx) {
    return Validator(function (input) {
        assert.isString(input);
        assert.isRegEx(regEx, input);
        return input;
    }, RegEx.name);
}
exports.RegEx = RegEx;
/**
 * Integer validator with optional conversion.
 * @param {boolean} conversion Optional conversion.
 */
function Int(conversion) {
    if (conversion === void 0) { conversion = false; }
    return Validator(function (input) {
        if (conversion)
            return convert.toInt(input);
        else
            assert.isInt(input);
        return input;
    }, Int.name);
}
exports.Int = Int;
/**
 * Iso8601 validator with optional conversion.
 * @param {boolean} conversion Optional conversion.
 */
function Iso8601(conversion) {
    return Validator(function (input) {
        if (conversion)
            return convert.toIso8601(input);
        assert.isString(input);
        assert.isIso8601(input);
        return input;
    }, Iso8601.name);
}
exports.Iso8601 = Iso8601;
/**
 * Date/Time validator with optional conversion.
 * @param {boolean} conversion Optional conversion.
 */
function DateTime(conversion) {
    if (conversion === void 0) { conversion = false; }
    return Validator(function (input) {
        if (conversion)
            return convert.toDate(input);
        else
            assert.isDateString(input);
        return input;
    }, DateTime.name);
}
exports.DateTime = DateTime;
//# sourceMappingURL=validators.js.map