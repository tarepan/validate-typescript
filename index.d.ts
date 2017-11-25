export function validate<T>(schema: T, input: any, name?: string): T;

export function Email(): string;
export function ID(): number;
export function RegEx(regEx: RegExp): string;

export function Type<A, B>(ctor: ((() => A) | (new () => B))): B;
export function Options<T>(validators: T[]): T;
export function Optional<T>(validator: T): T | undefined;
export function Nullable<T>(validator: T): T | null;
export function Validator<T>(method: (input: any, prop: string) => T): T;

export function toInt(input: any): number;
export function toNumber(input: any): number;
export function toBoolean(input: any): boolean | undefined;

export function isEqual(target: any, value: any, name: string): never;
export function isBoolean(value: string, name: string): never;
export function isString(value: string, name: string): never;
export function isNumber(value: number, name: string): never;
export function isInt(value: number, name: string): never;
export function isFloat(value: number, name: string): never;
export function isPositive(value: number, name: string): never;
export function isArray(value: any[], name: string): never;
export function isNull(value: any, name: string): never;
export function isNonNullObject(value: any, name: string): never;
export function isUndefined(value: number, name: string): never;
export function isDefined(value: number, name: string) : never;
export function isRegEx(regEx: RegExp, value: string, name: string): never;