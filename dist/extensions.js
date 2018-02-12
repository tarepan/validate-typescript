"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("./assertions");
const convert = require("./conversions");
const validators_1 = require("./validators");
function propRef(prop, validator) {
    return `[${validator}]: ${prop}`;
}
exports.propRef = propRef;
/**
 * @description RFC 5322 based email address validation
 * @see https://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
 */
function Email() {
    return validators_1.Alias(RegEx(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/), Email.name);
}
exports.Email = Email;
function ID() {
    return validators_1.Validator((input) => {
        const value = convert.toInt(input);
        assert.isGreaterThan(0, value);
        return value;
    }, ID.name);
}
exports.ID = ID;
function RegEx(regEx) {
    return validators_1.Validator((input) => {
        assert.isString(input);
        assert.isRegEx(regEx, input);
        return input;
    }, RegEx.name);
}
exports.RegEx = RegEx;
function Int(conversion = false) {
    return validators_1.Validator((input) => {
        if (conversion)
            return convert.toInt(input);
        else
            assert.isInt(input);
        return input;
    }, Int.name);
}
exports.Int = Int;
function Iso8601(conversion) {
    return validators_1.Validator((input) => {
        if (conversion)
            return convert.toIso8601(input);
        assert.isString(input);
        assert.isIso8601(input);
        return input;
    }, Iso8601.name);
}
exports.Iso8601 = Iso8601;
function DateTime(conversion = false) {
    return validators_1.Validator((input) => {
        /*      const value = (conversion) ? convert.toDate(input) : input;
              assert.isInt(value);
              return value;
      */
        if (conversion)
            return convert.toDate(input);
        else
            assert.isDateString(input);
        return input;
    }, DateTime.name);
}
exports.DateTime = DateTime;
function Date() {
}
exports.Date = Date;
// export function Time() {
// return OM.BasicModel([Date, new RegExp("^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$")]);
// }
// export function DateTime() {
//     return OM.BasicModel([Date, String]).assert((str: string) => {
//         const value = Date.parse(str);
//         return !isNaN(value) && value > 0;
//     });
// }
//# sourceMappingURL=extensions.js.map