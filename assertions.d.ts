
export function Assert(condition: boolean, invert: boolean, value: any, assertion: string, 
                       details: string);

export function isSameType(target: any, value: any, invert: boolean): void;

export function isSameTypeName(target: string, value: string, invert: boolean): void;

export function isEqual(target: any, value: any, invert: boolean): void;

export function isSymbol(value: string, invert: boolean): void;

export function isBoolean(value: string, invert: boolean): void;

export function isString(value: string, invert: boolean): void;

export function isNumber(value: number, invert: boolean): void;

export function isInt(value: number, invert: boolean): void;

export function isFloat(value: number, invert: boolean): void;

export function isEqualTo(target: number, value: number, invert: boolean): void;

export function isGreaterThan(target: number, value: number, invert: boolean): void;

export function isGreaterThanOrEqualTo(target: number, value: number, invert: boolean): void;

export function isLessThanOrEqualTo(target: number, value: number, invert: boolean): void;

export function isLessThan(target: number, value: number, invert: boolean): void;

export function isArray(value: any[], invert: boolean): void;

export function isNull(value: any, invert: boolean): void;

export function isObject(value: any, invert: boolean): void;

export function isUndefined(value: number, invert: boolean): void;

export function isRegEx(regEx: RegExp, value: string, invert: boolean): void;