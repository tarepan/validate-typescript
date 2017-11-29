import * as sym from './symbols';
import { nullOrUndef } from './common';
import { validate } from './validate';

export enum ValidationOptions {
    any = 0,
    all,
}

export type ValidationMethod<T> = (input: any) => T;

export function Primative<T>(ctor: (() => T)): T {
    return Type(ctor);
}

export function Type<A, B>(ctor: ((() => A) | (new () => B))): B {
        
    if (nullOrUndef(ctor) || nullOrUndef(ctor.prototype))
        throw new Error('Schema error, not a valid type.');

    let result = <any>(() => {});
    result[sym.Validator] = sym.TypeValidator;
    result[sym.TypeValidator] = ctor.prototype.constructor.name;
    return result as B;
}

export function Options<T>(schemas: T[], name: string = Options.name, 
                           option: ValidationOptions = ValidationOptions.any): T {
    let result = <any>(() => {});
    result[sym.Validator] = sym.OptionsValidator;
    result[sym.OptionsValidator] = { schemas, option };
    result[sym.Metadata] = { name };
    return result as T;
}

export function Any<T>(schemas: T[], name: string = Any.name): T {
    return Options(schemas, name, ValidationOptions.any);
}

export function All<T>(schemas: T[], name: string = All.name): T {
    return Options(schemas, name, ValidationOptions.all);
}

export function Optional<T>(schema: T, name: string = Optional.name): T | undefined {
    return Options([schema, undefined], name);
}

export function Nullable<T>(schema: T, name: string = Nullable.name): T | null {
    return Options([schema, null], name);
}

export function Validator<T>(method: ValidationMethod<T>, name: string = Validator.name): T {
    const result = <any>(() => {});
    result[sym.Validator] = sym.CustomValidator;
    result[sym.CustomValidator] = method;
    result[sym.Metadata] = { name };
    return result as T;
}

export function Alias<T>(validator: T, name: string = Alias.name): T {
    (<any>validator)[sym.Metadata].name = name;
    return validator;
}
