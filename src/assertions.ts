import { objToStr } from './common';
import { AssertionError } from './error';

export function Assert(condition: boolean, value: any, assertion: string, details: string) {
    if (!condition) throw new AssertionError(value, assertion, details);
}

export function isEqual(target: any, value: any) {
    Assert(target === value, value, isEqual.name, `is not equal to ${objToStr(target)}`);
}

export function isBoolean(value: string) {
    Assert(typeof value === 'boolean', value, isBoolean.name, 'is not a boolean');
}

export function isString(value: string) {
    Assert(typeof value === 'string', value, isString.name, 'is not a string');
}

export function isNumber(value: number) {
    Assert(!Number.isNaN(value), value, isNumber.name, 'is NaN');
}

export function isInt(value: number) {
    Assert(Number.isInteger(value), value, isInt.name, 'is not an integer');
}

export function isFloat(value: number) {
    // todo update
    Assert(!Number.isNaN(value), value, isFloat.name, 'is not an float');
}

export function isGreaterThanZero(value: number) {
    Assert(value > 0, value, isGreaterThanZero.name, 'is not >= 0');
}

export function isArray(value: any[]) {
    Assert(Array.isArray(value), value, isArray.name, 'is not an array');
}

export function isNull(value: any) {
    Assert(value === null, value, isNull.name, 'is not null');
}

export function isNonNullObject(value: any) {
    Assert(typeof value === 'object' && value !== null, value, isNonNullObject.name, 'is not an object or null');
}

export function isUndefined(value: number) {
    Assert(typeof value === 'undefined', value, isUndefined.name, 'is not undefined');
}

export function isDefined(value: number) {
    Assert(typeof value !== 'undefined', value, isDefined.name, 'is undefined');
}

export function isRegEx(regEx: RegExp, value: string) {
    Assert(regEx.test(value), value, isRegEx.name, `does not match RegExp ${regEx}`);
}