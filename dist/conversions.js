"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const checks = require("./checks");
function toInt(input) {
    let value = NaN;
    if ((typeof input === 'number') && Number.isInteger(input)) {
        value = input;
    }
    else if ((typeof input === 'string') && (/^(\d+)(.0+)?$/.test(input))) {
        value = Number.parseInt(input);
    }
    if (Number.isNaN(value)) {
        throw new errors_1.ConversionError(input, toInt.name, 'could not be converted to an integer');
    }
    return value;
}
exports.toInt = toInt;
function toNumber(input) {
    let value = NaN;
    //todo add extra checks for (additional chars)
    if (typeof input === 'string' || typeof input === 'number')
        value = Number(input);
    if (Number.isNaN(value)) {
        throw new errors_1.ConversionError(input, toNumber.name, 'could not be converted to a number');
    }
    return value;
}
exports.toNumber = toNumber;
function toBoolean(input) {
    let value = undefined;
    if (typeof input === 'boolean') {
        value = input;
    }
    else if (typeof input === 'string') {
        if (input === 'true')
            value = true;
        else if (input === 'false')
            value = false;
    }
    else if (typeof input === 'number') {
        if (input === 0)
            value = true;
        else if (input === 1)
            value = false;
    }
    if (typeof value === 'undefined') {
        throw new errors_1.ConversionError(input, toBoolean.name, 'could not be converted to a boolean');
    }
    return value;
}
exports.toBoolean = toBoolean;
function toIso8601(input) {
    let value = undefined;
    if (typeof input === 'string') {
        checks.isIso8601(input);
    }
    if (typeof value === 'undefined') {
        throw new errors_1.ConversionError(input, toIso8601.name, 'could not be converted to an ISO8601 Date');
    }
    return value;
}
exports.toIso8601 = toIso8601;
function toDate(input) {
    let value = undefined;
    if (typeof input === 'string') {
        let ms = Date.parse(input);
        if (!Number.isNaN(ms)) {
            value = new Date(ms);
        }
    }
    if (typeof value === 'undefined') {
        throw new errors_1.ConversionError(input, toDate.name, 'could not be converted to a Date');
    }
    return value;
}
exports.toDate = toDate;
//# sourceMappingURL=conversions.js.map