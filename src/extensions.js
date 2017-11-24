"use strict";
exports.__esModule = true;
var assert = require("./assertions");
var convert = require("./conversions");
var validators_1 = require("./validators");
function propRef(prop, validator) {
    return "[" + validator + "]: " + prop;
}
exports.propRef = propRef;
function Email() {
    return validators_1.Validator(function (input, prop) {
        var ref = propRef(prop, Email.name);
        // apply email stuff here
        return "";
    });
}
exports.Email = Email;
function ID() {
    return validators_1.Validator(function (input, prop) {
        var ref = propRef(prop, ID.name);
        var value = convert.toInt(input);
        assert.isInt(value, ref);
        assert.isPositive(value, ref);
        return value;
    });
}
exports.ID = ID;
function RegEx(regEx) {
    return validators_1.Validator(function (input, prop) {
        var ref = propRef(prop, RegEx.name);
        assert.isString(input, ref);
        assert.isRegEx(regEx, input, ref);
        return input;
    });
}
exports.RegEx = RegEx;
