"use strict";
exports.__esModule = true;
var sym = require("./symbols");
var common_1 = require("./common");
function Type(ctor) {
    if (common_1.nullOrUndef(ctor) || common_1.nullOrUndef(ctor.prototype))
        throw new Error('Schema error, not a valid type.');
    var result = (function () { });
    result[sym.Validator] = sym.TypeValidator;
    result[sym.TypeValidator] = ctor.prototype.constructor.name;
    return result;
}
exports.Type = Type;
function Options(validators) {
    var result = (function () { });
    result[sym.Validator] = sym.OptionsValidator;
    result[sym.OptionsValidator] = validators;
    return result;
}
exports.Options = Options;
function Optional(validator) {
    return Options([validator, undefined]);
}
exports.Optional = Optional;
function Nullable(validator) {
    return Options([validator, null]);
}
exports.Nullable = Nullable;
function Validator(method) {
    var result = (function () { });
    result[sym.Validator] = sym.CustomValidator;
    result[sym.CustomValidator] = method;
    return result;
}
exports.Validator = Validator;
