"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const errors_1 = require("./errors");
const checks = require("./checks");
function Assert(condition, invert, value, assertion, details) {
    let name = ((invert) ? 'isNot' : 'is') + assertion.slice(2);
    let messagePrefix = (invert) ? 'is' : 'is not';
    let message = `${messagePrefix} ${details}`;
    if ((invert) ? condition : !condition)
        throw new errors_1.AssertionError(value, name, message);
}
exports.Assert = Assert;
function isSameType(target, value, invert = false) {
    let targetType = common_1.objectType(target);
    let valueType = common_1.objectType(value);
    Assert(targetType === valueType, invert, valueType, isSameType.name, `the same type as ${common_1.objToStr(targetType)}`);
}
exports.isSameType = isSameType;
function isSameTypeName(target, value, invert = false) {
    Assert(target === value, invert, value, isSameTypeName.name, `the same type as ${common_1.objToStr(target)}`);
}
exports.isSameTypeName = isSameTypeName;
function isEqual(target, value, invert = false) {
    Assert(target === value, invert, value, isEqual.name, `equal to ${common_1.objToStr(target)}`);
}
exports.isEqual = isEqual;
function isSymbol(value, invert = false) {
    Assert(typeof value === 'symbol', invert, value, isSymbol.name, 'a symbol');
}
exports.isSymbol = isSymbol;
function isBoolean(value, invert = false) {
    Assert(typeof value === 'boolean', invert, value, isBoolean.name, 'a boolean');
}
exports.isBoolean = isBoolean;
function isString(value, invert = false) {
    Assert(typeof value === 'string', invert, value, isString.name, 'a string');
}
exports.isString = isString;
function isNumber(value, invert = false) {
    Assert(!Number.isNaN(value), invert, value, isNumber.name, 'a number');
}
exports.isNumber = isNumber;
function isInt(value, invert = false) {
    Assert(Number.isInteger(value), invert, value, isInt.name, 'an integer');
}
exports.isInt = isInt;
function isFloat(value, invert = false) {
    // todo update
    Assert(!Number.isNaN(value), invert, value, isFloat.name, 'a float');
}
exports.isFloat = isFloat;
function isEqualTo(target, value, invert = false) {
    Assert(value == target, invert, value, isEqualTo.name, `== ${target}`);
}
exports.isEqualTo = isEqualTo;
function isGreaterThan(target, value, invert = false) {
    Assert(value > target, invert, value, isGreaterThan.name, `> ${target}`);
}
exports.isGreaterThan = isGreaterThan;
function isGreaterThanOrEqualTo(target, value, invert = false) {
    Assert(value >= target, invert, value, isGreaterThanOrEqualTo.name, `>= ${target}`);
}
exports.isGreaterThanOrEqualTo = isGreaterThanOrEqualTo;
function isLessThanOrEqualTo(target, value, invert = false) {
    Assert(value <= target, invert, value, isLessThanOrEqualTo.name, `>= ${target}`);
}
exports.isLessThanOrEqualTo = isLessThanOrEqualTo;
function isLessThan(target, value, invert = false) {
    Assert(value < target, invert, value, isLessThan.name, `< ${target}`);
}
exports.isLessThan = isLessThan;
function isArray(value, invert = false) {
    Assert(Array.isArray(value), invert, value, isArray.name, 'an array');
}
exports.isArray = isArray;
function isNull(value, invert = false) {
    Assert(value == null, invert, value, isNull.name, 'null');
}
exports.isNull = isNull;
function isObject(value, invert = false) {
    Assert(typeof value === 'object', invert, value, isObject.name, 'an object');
}
exports.isObject = isObject;
function isUndefined(value, invert = false) {
    Assert(typeof value === 'undefined', invert, value, isUndefined.name, 'undefined');
}
exports.isUndefined = isUndefined;
function isRegEx(regEx, value, invert = false) {
    Assert(regEx.test(value), invert, value, isRegEx.name, `a regular expression match`);
}
exports.isRegEx = isRegEx;
function isDateString(value, invert = false) {
    Assert(isNaN(Date.parse(value)), invert, value, isRegEx.name, `a regular expression match`);
}
exports.isDateString = isDateString;
function isIso8601(value, invert = false) {
    Assert(checks.isIso8601(value), invert, value, isIso8601.name, `an ISO8601 date match`);
}
exports.isIso8601 = isIso8601;
//# sourceMappingURL=assertions.js.map