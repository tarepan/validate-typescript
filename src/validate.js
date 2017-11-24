"use strict";
exports.__esModule = true;
var assert = require("./assertions");
var sym = require("./symbols");
var common_1 = require("./common");
function validateObject(schema, input, name) {
    // Null Validation
    if (schema === null) {
        assert.isNull(input);
        return input;
    }
    // Array Validation
    if (Array.isArray(schema)) {
        assert.isArray(input, name);
        var memIdx = 0;
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var member = input_1[_i];
            var idx = 0;
            for (var _a = 0, schema_1 = schema; _a < schema_1.length; _a++) {
                var prop = schema_1[_a];
                try {
                    input[memIdx] = validate(prop, member, name + "[" + idx++ + "]");
                    break;
                }
                catch (_b) {
                    if (idx === schema.length) {
                        throw new Error(name + " " + JSON.stringify(member, null, '  ') + " does not match array schema");
                    }
                }
            }
            memIdx++;
        }
        // Object Validation
    }
    else {
        assert.isNonNullObject(input, name);
        for (var _c = 0, _d = Object.getOwnPropertyNames(schema); _c < _d.length; _c++) {
            var prop = _d[_c];
            input[prop] = validate(schema[prop], input[prop], name + "." + prop);
        }
    }
    return input;
}
exports.validateObject = validateObject;
;
function validateFunction(schema, input, name) {
    // Type Validation
    if (schema[sym.Validator] === sym.TypeValidator) {
        var type = common_1.objectType(input);
        var schemaType = schema[sym.TypeValidator];
        if (type) {
            if (type !== schemaType)
                throw new Error("type mismatch " + schemaType + " - " + type);
        }
        else
            throw new Error('type mismatch');
    }
    else if (schema[sym.Validator] === sym.OptionsValidator) {
        var idx = 0;
        for (var _i = 0, _a = schema[sym.OptionsValidator]; _i < _a.length; _i++) {
            var subSchema = _a[_i];
            try {
                idx++;
                input = validate(subSchema, input, name);
                break;
            }
            catch (_b) {
                if (idx === schema[sym.OptionsValidator].length) {
                    throw new Error(name + " " + JSON.stringify(input, null, '  ') + " does not match schema options");
                }
            }
        }
    }
    else if (schema[sym.Validator] === sym.CustomValidator) {
        input = schema[sym.CustomValidator](input, name);
    }
    return input;
}
exports.validateFunction = validateFunction;
;
function validateString(schema, input, name) {
    assert.isString(input, name);
    assert.isEqual(schema, input, name);
    return input;
}
exports.validateString = validateString;
;
function validateNumber(schema, input, name) {
    assert.isNumber(input, name);
    assert.isEqual(schema, input, name);
    return input;
}
exports.validateNumber = validateNumber;
;
function validateBoolean(schema, input, name) {
    assert.isBoolean(input, name);
    assert.isEqual(schema, input, name);
    return input;
}
exports.validateBoolean = validateBoolean;
;
function validateSymbol(schema, input, name) {
    //todo
    return input;
}
exports.validateSymbol = validateSymbol;
;
function validateUndefined(schema, input, name) {
    assert.isUndefined(input, name);
    return input;
}
exports.validateUndefined = validateUndefined;
;
function validateDefault(schema, input, name) {
    //todo
    return input;
}
exports.validateDefault = validateDefault;
;
function validate(schema, input, name) {
    // check schema is not null
    //    assert.isNonNullObject(input, name);
    if (name === void 0) { name = 'input'; }
    if (typeof schema === 'object') {
        input = validateObject(schema, input, name);
    }
    else if (typeof schema === 'function') {
        input = validateFunction(schema, input, name);
    }
    else if (typeof schema === 'string') {
        input = validateString(schema, input, name);
    }
    else if (typeof schema === 'number') {
        input = validateNumber(schema, input, name);
    }
    else if (typeof schema === 'boolean') {
        input = validateBoolean(schema, input, name);
    }
    else if (typeof schema === 'symbol') {
        input = validateSymbol(schema, input, name);
    }
    else if (typeof schema === 'undefined') {
        input = validateUndefined(schema, input, name);
    }
    else {
        input = validateDefault(schema, input, name);
    }
    return input;
}
exports.validate = validate;
