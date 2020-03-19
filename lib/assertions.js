"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var errors_1 = require("./errors");
exports.INVERT = true;
/**
 * Base assertion function
 * @param {boolean} condition Condition to be asserted.
 * @param {boolean} invert Whether the conversion should be inverted.
 * @param {any} value value that is asserted.
 * @param {string} assertion Assertion name.
 * @param {string} details Assertion description.
 * @throws {AssertionError} If the assertion fails.
 */
function Assert(condition, invert, value, assertion, details) {
    var name = (invert ? "isNot" : "is") + assertion.slice(2);
    var messagePrefix = invert ? "is" : "is not";
    var message = messagePrefix + " " + details;
    if (invert ? condition : !condition)
        throw new errors_1.AssertionError(value, name, message);
}
exports.Assert = Assert;
/**
 * Object type assertion.
 * @param {any} target Reference object.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isSameType(target, value, invert) {
    if (invert === void 0) { invert = false; }
    var targetType = common_1.objectType(target);
    var valueType = common_1.objectType(value);
    Assert(targetType === valueType, invert, valueType, isSameType.name, "the same type as " + common_1.objectToString(targetType));
}
exports.isSameType = isSameType;
/**
 * Object type name assertion.
 * @param {string} target Reference object type name.
 * @param {string} value Object type name being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isSameTypeName(target, value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(target === value, invert, value, isSameTypeName.name, "the same type as " + common_1.objectToString(target));
}
exports.isSameTypeName = isSameTypeName;
/**
 * Equality assertion.
 * @param {any} target Reference object.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isEqual(target, value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(target === value, invert, value, isEqual.name, "equal to " + common_1.objectToString(target));
}
exports.isEqual = isEqual;
/**
 * Symbol assertion.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isSymbol(value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(typeof value === "symbol", invert, value, isSymbol.name, "a symbol");
}
exports.isSymbol = isSymbol;
/**
 * Boolean assertion.
 * @param {boolean} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isBoolean(value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(typeof value === "boolean", invert, value, isBoolean.name, "a boolean");
}
exports.isBoolean = isBoolean;
/**
 * String assertion.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isString(value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(typeof value === "string", invert, value, isString.name, "a string");
}
exports.isString = isString;
/**
 * Numeric assertion.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isNumber(value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(!Number.isNaN(value), invert, value, isNumber.name, "a number");
}
exports.isNumber = isNumber;
/**
 * Integer assertion.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isInt(value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(Number.isInteger(value), invert, value, isInt.name, "an integer");
}
exports.isInt = isInt;
/**
 * Float assertion.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 * @todo Update
 */
function isFloat(value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(!Number.isNaN(value), invert, value, isFloat.name, "a float");
}
exports.isFloat = isFloat;
/**
 * Numeric equality assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isEqualTo(target, value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(value == target, invert, value, isEqualTo.name, "== " + target);
}
exports.isEqualTo = isEqualTo;
/**
 * Numeric greater than assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isGreaterThan(target, value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(value > target, invert, value, isGreaterThan.name, "> " + target);
}
exports.isGreaterThan = isGreaterThan;
/**
 * Numeric greater than or equal to assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isGreaterThanOrEqualTo(target, value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(value >= target, invert, value, isGreaterThanOrEqualTo.name, ">= " + target);
}
exports.isGreaterThanOrEqualTo = isGreaterThanOrEqualTo;
/**
 * Numeric less than or equal to assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isLessThanOrEqualTo(target, value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(value <= target, invert, value, isLessThanOrEqualTo.name, ">= " + target);
}
exports.isLessThanOrEqualTo = isLessThanOrEqualTo;
/**
 * Numeric less than assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isLessThan(target, value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(value < target, invert, value, isLessThan.name, "< " + target);
}
exports.isLessThan = isLessThan;
/**
 * Array assertion.
 * @param {any[]} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isArray(value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(Array.isArray(value), invert, value, isArray.name, "an array");
}
exports.isArray = isArray;
/**
 * Null assertion.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isNull(value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(value === null, invert, value, isNull.name, "null");
}
exports.isNull = isNull;
/**
 * Object assertion.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isObject(value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(typeof value === "object", invert, value, isObject.name, "an object");
}
exports.isObject = isObject;
/**
 * Undefined assertion.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isUndefined(value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(typeof value === "undefined", invert, value, isUndefined.name, "undefined");
}
exports.isUndefined = isUndefined;
/**
 * RegEx assertion.
 * @param {RegExp} regEx Regular expression to be matched.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isRegEx(regEx, value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(regEx.test(value), invert, value, isRegEx.name, "a regular expression match");
}
exports.isRegEx = isRegEx;
/**
 * Date string assertion.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isDateString(value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(isNaN(Date.parse(value)), invert, value, isRegEx.name, "a regular expression match");
}
exports.isDateString = isDateString;
/**
 * ISO 8601 assertion.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
function isIso8601(value, invert) {
    if (invert === void 0) { invert = false; }
    Assert(common_1.isIso8601(value), invert, value, isIso8601.name, "an ISO8601 date match");
}
exports.isIso8601 = isIso8601;
//# sourceMappingURL=assertions.js.map