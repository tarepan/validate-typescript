"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("./assertions");
const sym = require("./symbols");
const common_1 = require("./common");
const errors_1 = require("./errors");
const validators_1 = require("./validators");
function ValidateObject(schema, input, name) {
    // Null Validation
    if (schema === null) {
        Null(schema, input, name);
        return input;
    }
    // Array Validation
    if (Array.isArray(schema)) {
        try {
            assert.isArray(input);
        }
        catch (ex) {
            throw new errors_1.ValidatorError(Array.name, name, input, ex);
        }
        let memIdx = 0;
        for (const member of input) {
            let idx = 0;
            for (const prop of schema) {
                try {
                    input[memIdx] = ValidateRecursive(prop, member, `${name}[${idx}]`);
                    break;
                }
                catch (ex) {
                    if ((idx + 1) === schema.length) {
                        throw new errors_1.ValidatorError(Array.name, `${name}[${idx}]`, input, new errors_1.NotMatchAnyError(input[idx]));
                    }
                }
                idx++;
            }
            memIdx++;
        }
        // Object Validation
    }
    else {
        try {
            assert.isObject(input);
            assert.isNull(input, true);
            assert.isArray(input, true);
        }
        catch (ex) {
            throw new errors_1.ValidatorError(Object.name, name, input, ex);
        }
        for (const prop of Object.getOwnPropertyNames(schema)) {
            input[prop] = ValidateRecursive(schema[prop], input[prop], `${name}.${prop}`);
        }
    }
    return input;
}
exports.ValidateObject = ValidateObject;
;
function ValidateFunction(schema, input, name) {
    // Type Validation
    if (schema[sym.Validator] === sym.TypeValidator) {
        let typeName = schema[sym.TypeValidator];
        try {
            assert.isSameTypeName(typeName, common_1.objectType(input));
        }
        catch (ex) {
            throw new errors_1.ValidatorError(typeName, name, input, ex);
        }
    }
    else if (schema[sym.Validator] === sym.OptionsValidator) {
        let schemas = schema[sym.OptionsValidator].schemas;
        let option = schema[sym.OptionsValidator].option;
        let optionName = schema[sym.Metadata].name;
        let idx = 0;
        for (const subSchema of schemas) {
            try {
                idx++;
                input = ValidateRecursive(subSchema, input, name);
                if (option === validators_1.ValidationOptions.any)
                    break;
            }
            catch (ex) {
                if ((option === validators_1.ValidationOptions.all) || (idx === schemas.length)) {
                    ex = (option === validators_1.ValidationOptions.all) ? ex : new errors_1.NotMatchAnyError(input);
                    throw new errors_1.ValidatorError(optionName, name, input, ex);
                }
            }
        }
    }
    else if (schema[sym.Validator] === sym.CustomValidator) {
        let validatorName = schema[sym.Metadata].name;
        try {
            input = schema[sym.CustomValidator](input, name);
        }
        catch (ex) {
            throw new errors_1.ValidatorError(validatorName, name, input, ex);
        }
    }
    return input;
}
exports.ValidateFunction = ValidateFunction;
;
function LiteralString(schema, input, name) {
    try {
        assert.isString(input);
        assert.isEqual(schema, input);
    }
    catch (ex) {
        throw new errors_1.ValidatorError(LiteralString.name, name, input, ex);
    }
    return input;
}
exports.LiteralString = LiteralString;
;
function LiteralNumber(schema, input, name) {
    try {
        assert.isNumber(input);
        assert.isEqual(schema, input);
    }
    catch (ex) {
        throw new errors_1.ValidatorError(LiteralNumber.name, name, input, ex);
    }
    return input;
}
exports.LiteralNumber = LiteralNumber;
;
function LiteralBoolean(schema, input, name) {
    try {
        assert.isBoolean(input);
        assert.isEqual(schema, input);
    }
    catch (ex) {
        throw new errors_1.ValidatorError(LiteralBoolean.name, name, input, ex);
    }
    return input;
}
exports.LiteralBoolean = LiteralBoolean;
;
function LiteralSymbol(schema, input, name) {
    try {
        assert.isSymbol(input);
        assert.isEqual(schema, input);
    }
    catch (ex) {
        throw new errors_1.ValidatorError(LiteralSymbol.name, name, input, ex);
    }
    return input;
}
exports.LiteralSymbol = LiteralSymbol;
;
function Undefined(schema, input, name) {
    try {
        assert.isUndefined(input);
    }
    catch (ex) {
        throw new errors_1.ValidatorError(Undefined.name, name, input, ex);
    }
    return input;
}
exports.Undefined = Undefined;
;
function Null(schema, input, name) {
    try {
        assert.isNull(input);
    }
    catch (ex) {
        throw new errors_1.ValidatorError(Null.name, name, input, ex);
    }
    return input;
}
exports.Null = Null;
;
function Unknown(schema, input, name) {
    throw new errors_1.ValidatorError(Undefined.name, name, input, new Error('unknown validation error.'));
}
exports.Unknown = Unknown;
;
function ValidateRecursive(schema, input, name) {
    if (typeof schema === 'object') {
        input = ValidateObject(schema, input, name);
    }
    else if (typeof schema === 'function') {
        input = ValidateFunction(schema, input, name);
    }
    else if (typeof schema === 'string') {
        input = LiteralString(schema, input, name);
    }
    else if (typeof schema === 'number') {
        input = LiteralNumber(schema, input, name);
    }
    else if (typeof schema === 'boolean') {
        input = LiteralBoolean(schema, input, name);
    }
    else if (typeof schema === 'symbol') {
        input = LiteralSymbol(schema, input, name);
    }
    else if (typeof schema === 'undefined') {
        input = Undefined(schema, input, name);
    }
    else {
        input = Unknown(schema, input, name);
    }
    return input;
}
function validate(schema, input, name = 'input') {
    try {
        ValidateRecursive(schema, input, name);
    }
    catch (ex) {
        throw new Error(`\n${ex.message}`);
    }
    return input;
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map