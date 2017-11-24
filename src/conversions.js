"use strict";
exports.__esModule = true;
function toInt(input) {
    var value = NaN;
    //todo add extra checks for (additional chars)
    if (typeof input === 'string' || typeof input === 'number')
        value = Number.parseInt(input);
    return value;
}
exports.toInt = toInt;
function toNumber(input) {
    var value = NaN;
    //todo add extra checks for (additional chars)
    if (typeof input === 'string' || typeof input === 'number')
        value = Number(input);
    return value;
}
exports.toNumber = toNumber;
function toBoolean(input) {
    var value = undefined;
    if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean')
        value = Boolean(input);
    //todo throwing exception
    return value;
}
exports.toBoolean = toBoolean;
