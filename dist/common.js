"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function nullOrUndef(value) {
    return (value === null || typeof value === 'undefined');
}
exports.nullOrUndef = nullOrUndef;
function objectType(obj) {
    if (nullOrUndef(obj) || nullOrUndef(obj.constructor))
        return undefined;
    else
        return obj.constructor.name;
}
exports.objectType = objectType;
function objToStr(obj) {
    return JSON.stringify(obj, null, '  ');
}
exports.objToStr = objToStr;
//# sourceMappingURL=common.js.map