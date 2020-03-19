"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var errors_1 = require("./errors");
/**
 * Convert to integer if possible.
 * @param {any} input Value to be converted.
 * @throws {ConversionError} If conversion fails.
 */
function toInt(input) {
    var value = NaN;
    if (typeof input === "number" && Number.isInteger(input)) {
        value = input;
    }
    else if (typeof input === "string" && /^(\d+)(.0+)?$/.test(input)) {
        value = Number.parseInt(input);
    }
    if (Number.isNaN(value)) {
        throw new errors_1.ConversionError(input, toInt.name, "could not be converted to an integer");
    }
    return value;
}
exports.toInt = toInt;
/**
 * Convert to number if possible.
 * @param {any} input Value to be converted.
 * @throws {ConversionError} If conversion fails.
 * @todo add extra checks for (additional chars)
 */
function toNumber(input) {
    var value = NaN;
    if (typeof input === "string" || typeof input === "number")
        value = Number(input);
    if (Number.isNaN(value)) {
        throw new errors_1.ConversionError(input, toNumber.name, "could not be converted to a number");
    }
    return value;
}
exports.toNumber = toNumber;
/**
 * Convert to boolean if possible.
 * @param {any} input Value to be converted.
 * @throws {ConversionError} If conversion fails.
 */
function toBoolean(input) {
    var value = undefined;
    if (typeof input === "boolean") {
        value = input;
    }
    else if (typeof input === "string") {
        if (input === "true")
            value = true;
        else if (input === "false")
            value = false;
    }
    else if (typeof input === "number") {
        if (input === 0)
            value = true;
        else if (input === 1)
            value = false;
    }
    if (typeof value === "undefined") {
        throw new errors_1.ConversionError(input, toBoolean.name, "could not be converted to a boolean");
    }
    return value;
}
exports.toBoolean = toBoolean;
/**
 * Convert to ISO 8601 if possible.
 * @param {any} input Value to be converted.
 * @throws {ConversionError} If conversion fails.
 */
function toIso8601(input) {
    var value = undefined;
    if (typeof input === "string") {
        common_1.isIso8601(input);
    }
    if (typeof value === "undefined") {
        throw new errors_1.ConversionError(input, toIso8601.name, "could not be converted to an ISO8601 Date");
    }
    return value;
}
exports.toIso8601 = toIso8601;
/**
 * Convert to date if possible.
 * @param {any} input Value to be converted.
 * @throws {ConversionError} If conversion fails.
 */
function toDate(input) {
    var value = undefined;
    if (typeof input === "string") {
        var ms = Date.parse(input);
        if (!Number.isNaN(ms)) {
            value = new Date(ms);
        }
    }
    if (typeof value === "undefined") {
        throw new errors_1.ConversionError(input, toDate.name, "could not be converted to a Date");
    }
    return value;
}
exports.toDate = toDate;
//# sourceMappingURL=conversions.js.map