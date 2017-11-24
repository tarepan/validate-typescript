"use strict";
exports.__esModule = true;
function nullOrUndef(value) {
    return (value === null || typeof value === 'undefined');
}
exports.nullOrUndef = nullOrUndef;
function objectType(obj) {
    if (nullOrUndef(obj) || nullOrUndef(obj.constructor))
        return null;
    else
        return obj.constructor.name;
}
exports.objectType = objectType;
