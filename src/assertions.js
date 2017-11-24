"use strict";
exports.__esModule = true;
function isEqual(target, value, name) {
    if (name === void 0) { name = 'Value'; }
    if (target !== value)
        throw new Error(name + ", " + JSON.stringify(value) + " !== " + JSON.stringify(target));
}
exports.isEqual = isEqual;
function isBoolean(value, name) {
    if (name === void 0) { name = 'Value'; }
    if (typeof value !== 'boolean')
        throw new Error(name + " is not a boolean.");
}
exports.isBoolean = isBoolean;
function isString(value, name) {
    if (name === void 0) { name = 'Value'; }
    if (typeof value !== 'string')
        throw new Error(name + " is not a string.");
}
exports.isString = isString;
function isNumber(value, name) {
    if (name === void 0) { name = 'Value'; }
    if (Number.isNaN(value))
        throw new Error(name + " is NaN.");
}
exports.isNumber = isNumber;
function isInt(value, name) {
    if (name === void 0) { name = 'Value'; }
    if (Number.isNaN(value))
        throw new Error(name + " is not an integer.");
}
exports.isInt = isInt;
function isFloat(value, name) {
    if (name === void 0) { name = 'Value'; }
    if (Number.isNaN(value))
        throw new Error(name + " is not a float.");
}
exports.isFloat = isFloat;
function isPositive(value, name) {
    if (name === void 0) { name = 'Value'; }
    if (value <= 0)
        throw new Error(name + " is <= 0, should be > 0.");
}
exports.isPositive = isPositive;
function isArray(value, name) {
    if (name === void 0) { name = 'value'; }
    if (!Array.isArray(value))
        throw new Error(name + " is not an array");
}
exports.isArray = isArray;
function isNull(value, name) {
    if (name === void 0) { name = 'Value'; }
    if (value !== null)
        throw new Error(name + " is not null");
}
exports.isNull = isNull;
function isNonNullObject(value, name) {
    if (name === void 0) { name = 'Value'; }
    if (typeof value !== 'object' || value === null)
        throw new Error(name + " is not an object or null");
}
exports.isNonNullObject = isNonNullObject;
function isUndefined(value, name) {
    if (name === void 0) { name = 'Value'; }
    if (typeof value !== 'undefined')
        throw new Error(name + " is not undefined.");
}
exports.isUndefined = isUndefined;
function isDefined(value, name) {
    if (name === void 0) { name = 'Value'; }
    if (typeof value === 'undefined')
        throw new Error(name + " is undefined.");
}
exports.isDefined = isDefined;
function isRegEx(regEx, value, name) {
    if (name === void 0) { name = 'Value'; }
    if (!regEx.test(value))
        throw new Error(name + " does not match RegExp.");
}
exports.isRegEx = isRegEx;
