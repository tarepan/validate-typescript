import * as assert from './assertions';
import * as convert from './conversions';
import { Validator, Options } from './validators';

export function propRef(prop: string, validator: string): string {
    return `[${validator}]: ${prop}`
}

/**
 * @description RFC 5322 based email address validation
 * @see https://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
 */
export function Email() {
    return RegEx(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
}

export function ID() {
    return Validator((input: any, prop: string): number => {
        const value = convert.toInt(input);
        assert.isInt(value);
        assert.isGreaterThanZero(value);
        return value;
    }, ID.name);
}

export function RegEx(regEx: RegExp) {
    return Validator((input: any, prop: string): string => {
        assert.isString(input);
        assert.isRegEx(regEx, input);
        return input;
    }, RegEx.name);
}
