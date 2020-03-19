"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Determines the typename of the provided object.
 * @param {any} obj Object for which the type is to be determined.
 * @returns {string|undefined|null} Object type.
 */
function objectType(obj) {
    if (isNullOrUndefined(obj)) {
        return obj;
    }
    else if (isNullOrUndefined(obj.constructor)) {
        return obj.constructor;
    }
    else
        return obj.constructor.name;
}
exports.objectType = objectType;
/**
 * Converts an object to string with double space indentation.
 * @param {any} obj Object to be converted to string.
 * @returns {string} Stringified object.
 */
function objectToString(obj) {
    return JSON.stringify(obj, null, "  ");
}
exports.objectToString = objectToString;
/**
 * Checks whether a value is undefined.
 * @param {any} value Value to be checked.
 * @returns {boolean} Whether the value is undefined.
 */
function isUndefined(value) {
    return typeof value === "undefined";
}
exports.isUndefined = isUndefined;
/**
 * Checks whether a value is null.
 * @param {any} value Value to be checked.
 * @returns {boolean} Whether the value is null.
 */
function isNull(value) {
    return value === null;
}
exports.isNull = isNull;
/**
 * Checks whether a value is null or undefined.
 * @param {any} value Value to be checked.
 * @returns {boolean} Whether the value is null or undefined.
 */
function isNullOrUndefined(value) {
    return isUndefined(value) || isNull(value);
}
exports.isNullOrUndefined = isNullOrUndefined;
/**
 * Checks whether a value is ISO 8601 formatted.
 * @param {string} value Value to be checked.
 * @returns {boolean} Whether the value is ISO 8601 formatted.
 */
function isIso8601(value) {
    var utcMs = Date.parse(value);
    return !Number.isNaN(utcMs) && value === new Date(utcMs).toISOString();
}
exports.isIso8601 = isIso8601;
//# sourceMappingURL=common.js.map