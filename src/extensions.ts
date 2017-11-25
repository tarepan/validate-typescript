import * as assert from './assertions';
import * as convert from './conversions';
import { Validator, Options } from './validators';

export function propRef(prop: string, validator: string): string {
    return `[${validator}]: ${prop}`
}

export function Email() {
    return Validator((input: any, prop: string): string => {
        const ref = propRef(prop, Email.name);
        // apply email stuff here
        return "";
    });
}

export function ID() {
    return Validator((input: any, prop: string): number => {
        const ref = propRef(prop, ID.name);
        const value = convert.toInt(input);
        assert.isInt(value, ref);
        assert.isPositive(value, ref);
        return value;
    });
}

export function RegEx(regEx: RegExp) {
    return Validator((input: any, prop: string): string => {
        const ref = propRef(prop, RegEx.name);
        assert.isString(input, ref);
        assert.isRegEx(regEx, input, ref);
        return input;
    });
}
