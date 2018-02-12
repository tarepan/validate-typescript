"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sym = require("./symbols");
const common_1 = require("./common");
var ValidationOptions;
(function (ValidationOptions) {
    ValidationOptions[ValidationOptions["any"] = 0] = "any";
    ValidationOptions[ValidationOptions["all"] = 1] = "all";
})(ValidationOptions = exports.ValidationOptions || (exports.ValidationOptions = {}));
function Primitive(ctor) {
    return Type(ctor);
}
exports.Primitive = Primitive;
function Type(ctor) {
    if (common_1.nullOrUndef(ctor) || common_1.nullOrUndef(ctor.prototype))
        throw new Error('Schema error, not a valid type.');
    let result = (() => { });
    result[sym.Validator] = sym.TypeValidator;
    result[sym.TypeValidator] = ctor.prototype.constructor.name;
    return result;
}
exports.Type = Type;
function Options(schemas, name = Options.name, option = ValidationOptions.any) {
    let result = (() => { });
    result[sym.Validator] = sym.OptionsValidator;
    result[sym.OptionsValidator] = { schemas, option };
    result[sym.Metadata] = { name };
    return result;
}
exports.Options = Options;
function Any(schemas, name = Any.name) {
    return Options(schemas, name, ValidationOptions.any);
}
exports.Any = Any;
function All(schemas, name = All.name) {
    return Options(schemas, name, ValidationOptions.all);
}
exports.All = All;
function Optional(schema, name = Optional.name) {
    return Options([schema, undefined], name);
}
exports.Optional = Optional;
function Nullable(schema, name = Nullable.name) {
    return Options([schema, null], name);
}
exports.Nullable = Nullable;
function Validator(method, name = Validator.name) {
    const result = (() => { });
    result[sym.Validator] = sym.CustomValidator;
    result[sym.CustomValidator] = method;
    result[sym.Metadata] = { name };
    return result;
}
exports.Validator = Validator;
function Alias(validator, name = Alias.name) {
    validator[sym.Metadata].name = name;
    return validator;
}
exports.Alias = Alias;
//# sourceMappingURL=validators.js.map