export function isEqual(target: any, value: any, name: string = 'Value') {
    if (target !== value) throw new Error(`${name}, ${JSON.stringify(value)} !== ${JSON.stringify(target)}`);
}

export function isBoolean(value: string, name: string = 'Value') {
    if (typeof value !== 'boolean') throw new Error(`${name} is not a boolean.`);
}

export function isString(value: string, name: string = 'Value') {
    if (typeof value !== 'string') throw new Error(`${name} is not a string.`);
}

export function isNumber(value: number, name: string = 'Value') {
    if (Number.isNaN(value)) throw new Error(`${name} is NaN.`);
}

export function isInt(value: number, name: string = 'Value') {
    if (Number.isNaN(value)) throw new Error(`${name} is not an integer.`);
}

export function isFloat(value: number, name: string = 'Value') {
    if (Number.isNaN(value)) throw new Error(`${name} is not a float.`);
}
export function isPositive(value: number, name: string = 'Value') {
    if (value <= 0) throw new Error(`${name} is <= 0, should be > 0.`);
}

export function isArray(value: any[], name: string = 'value') {
    if (!Array.isArray(value)) throw new Error(`${name} is not an array`);
}

export function isNull(value: any, name: string = 'Value') {
    if (value !== null) throw new Error(`${name} is not null`);
}

export function isNonNullObject(value: any, name: string = 'Value') {
    if (typeof value !== 'object' || value === null) throw new Error(`${name} is not an object or null`);
}

export function isUndefined(value: number, name: string = 'Value') {
    if (typeof value !== 'undefined') throw new Error(`${name} is not undefined.`);
}

export function isDefined(value: number, name: string = 'Value') {
    if (typeof value === 'undefined') throw new Error(`${name} is undefined.`);
}

export function isRegEx(regEx: RegExp, value: string, name: string = 'Value') {
    if (!regEx.test(value)) throw new Error(`${name} does not match RegExp.`);
}