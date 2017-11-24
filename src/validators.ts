import * as sym from './symbols';
import { nullOrUndef } from './common';

export function Type<A, B>(ctor: ((() => A) | (new () => B))): B {
        
    if (nullOrUndef(ctor) || nullOrUndef(ctor.prototype))
        throw new Error('Schema error, not a valid type.');

    let result = <any>(() => {});
    result[sym.Validator] = sym.TypeValidator;
    result[sym.TypeValidator] = ctor.prototype.constructor.name;
    
    return result as B;
}

export function Options<T>(validators: T[]): T {
    let result = <any>(() => {});
    result[sym.Validator] = sym.OptionsValidator;
    result[sym.OptionsValidator] = validators;
    return result as T;
}

export function Optional<T>(validator: T): T | undefined {
    return Options([validator, undefined]);
}

export function Nullable<T>(validator: T): T | null {
    return Options([validator, null]);
}

export function Validator<T>(method: (input: any, prop: string) => T): T {
    const result = <any>(() => {});
    result[sym.Validator] = sym.CustomValidator;
    result[sym.CustomValidator] = method;
    return result as T;
}


