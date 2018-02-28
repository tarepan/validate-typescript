import { objectToString, objectType } from './common';
import { AssertionError } from './errors';
import * as checks from './checks';

export const INVERT = true;

export function Assert(condition: boolean, invert: boolean, value: any, assertion: string, 
                       details: string): void {
    let name = ((invert) ? 'isNot' : 'is') + assertion.slice(2);
    let messagePrefix = (invert) ? 'is' : 'is not';
    let message = `${messagePrefix} ${details}`;
    if ((invert) ? condition : !condition) throw new AssertionError(value, name, message);
}

export function isSameType(target: any, value: any, invert: boolean = false): void {
    let targetType = objectType(target);
    let valueType  = objectType(value);
    Assert(targetType === valueType, invert, valueType, isSameType.name, 
           `the same type as ${objectToString(targetType)}`);
}

export function isSameTypeName(target: string, value: string, invert: boolean = false): void {
    Assert(target === value, invert, value, isSameTypeName.name, 
           `the same type as ${objectToString(target)}`);
}

export function isEqual(target: any, value: any, invert: boolean = false): void {
    Assert(target === value, invert, value, isEqual.name, `equal to ${objectToString(target)}`);
}

export function isSymbol(value: string, invert: boolean = false): void {
    Assert(typeof value === 'symbol', invert, value, isSymbol.name, 'a symbol');
}

export function isBoolean(value: string, invert: boolean = false): void {
    Assert(typeof value === 'boolean', invert, value, isBoolean.name, 'a boolean');
}

export function isString(value: string, invert: boolean = false): void {
    Assert(typeof value === 'string', invert, value, isString.name, 'a string');
}

export function isNumber(value: number, invert: boolean = false): void {
    Assert(!Number.isNaN(value), invert, value, isNumber.name, 'a number');
}

export function isInt(value: number, invert: boolean = false): void {
    Assert(Number.isInteger(value), invert, value, isInt.name, 'an integer');
}

export function isFloat(value: number, invert: boolean = false): void {
    // todo update
    Assert(!Number.isNaN(value), invert, value, isFloat.name, 'a float');
}

export function isEqualTo(target: number, value: number, invert: boolean = false): void {
    Assert(value == target, invert, value, isEqualTo.name, `== ${target}`);
}

export function isGreaterThan(target: number, value: number, invert: boolean = false): void {
    Assert(value > target, invert, value, isGreaterThan.name, `> ${target}`);
}

export function isGreaterThanOrEqualTo(target: number, value: number, invert: boolean = false): void {
    Assert(value >= target, invert, value, isGreaterThanOrEqualTo.name, `>= ${target}`);
}

export function isLessThanOrEqualTo(target: number, value: number, invert: boolean = false): void {
    Assert(value <= target, invert, value, isLessThanOrEqualTo.name, `>= ${target}`);
}

export function isLessThan(target: number, value: number, invert: boolean = false): void {
    Assert(value < target, invert, value, isLessThan.name, `< ${target}`);
}

export function isArray(value: any[], invert: boolean = false): void {
    Assert(Array.isArray(value), invert, value, isArray.name, 'an array');
}

export function isNull(value: any, invert: boolean = false): void {
    Assert(value == null, invert, value, isNull.name, 'null');
}

export function isObject(value: any, invert: boolean = false): void {
    Assert(typeof value === 'object', invert, value, isObject.name, 'an object');
}

export function isUndefined(value: number, invert: boolean = false): void {
    Assert(typeof value === 'undefined', invert, value, isUndefined.name, 'undefined');
}

export function isRegEx(regEx: RegExp, value: string, invert: boolean = false): void {
    Assert(regEx.test(value), invert, value, isRegEx.name, `a regular expression match`);
}

export function isDateString(value: string, invert: boolean = false): void {
    Assert(isNaN(Date.parse(value)) , invert, value, isRegEx.name, `a regular expression match`);
}

export function isIso8601(value: string, invert: boolean = false): void {
    Assert(checks.isIso8601(value), invert, value, isIso8601.name, `an ISO8601 date match`);
}