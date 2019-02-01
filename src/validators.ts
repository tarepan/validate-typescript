import * as sym from './symbols';
import * as assert from './assertions';
import * as convert from './conversions';
import { isNullOrUndefined } from './common';

export enum ValidationOptions {
    any = 0,
    all,
}

export type ValidationMethod<T> = (input: any, property: string) => T;

/**
 * Validator that checks that the value provided is a primitive type.
 * @param {() => T} ctor Primitive type constructor (e.g. String).
 * @param {string} name Optional override of the validator name.
 */
export function Primitive<T>(ctor: (() => T), name: string = Primitive.name): T {
    return Type(ctor, name);
}

/**
 * Validator that checks that the value provided is of the specified type.
 * @param {() => A | () => B} ctor Type constructor (e.g. MyOwnClass).
 * @param {string} name Optional override of the validator name.
 * @todo Try simplify ctor type.
 */
export function Type<A, B>(ctor: ((() => A) | (new () => B)), name: string = Type.name): B {
        
    if (isNullOrUndefined(ctor) || isNullOrUndefined(ctor.prototype))
        throw new Error('Schema error, not a valid type.');

    let result = <any>(() => {});
    result[sym.Validator] = sym.TypeValidator;
    result[sym.TypeValidator] = ctor.prototype.constructor.name;
    result[sym.Metadata] = { name };
    return result as B;
}

/**
 * Validator that supports multiple schemas.
 * 
 * The any or all option is used to ensure that only one or all of the schemas need to validate
 * successfully.
 * @param {T[]} schemas Multiple validation schemas.
 * @param {string} name Optional override of the validator name.
 * @param {ValidationOptions} option Selects all/any validation.
 */
export function Options<T>(schemas: T[], name: string = Options.name, 
                           option: ValidationOptions = ValidationOptions.any): T {
    let result = <any>(() => {});
    result[sym.Validator] = sym.OptionsValidator;
    result[sym.OptionsValidator] = { schemas, option };
    result[sym.Metadata] = { name };
    return result as T;
}

/**
 * Shorthand variant of Options with the option field set to any.
 * @param {T[]} schemas Multiple validation schemas.
 * @param {string} name Optional override of the validator name.
 */
export function Any<T>(schemas: T[], name: string = Any.name): T {
    return Options(schemas, name, ValidationOptions.any);
}

/**
 * Shorthand variant of Options with the option field set to all.
 * @param {T[]} schemas Multiple validation schemas.
 * @param {string} name Optional override of the validator name.
 */
export function All<T>(schemas: T[], name: string = All.name): T {
    return Options(schemas, name, ValidationOptions.all);
}

/**
 * Validator that is with an optional schema. Validation will succeed if undefined is passed as a 
 * value.
 * @param {T} schema Validation schemas.
 * @param {string} name Optional override of the validator name.
 */
export function Optional<T>(schema: T, name: string = Optional.name): T | undefined {
    return Options([schema, undefined], name);
}

/**
 * Validator that is with a nullable schema. Validation will succeed if null is passed as a value.
 * @param {T} schema Validation schemas.
 * @param {string} name Optional override of the validator name.
 */
export function Nullable<T>(schema: T, name: string = Nullable.name): T | null {
    return Options([schema, null], name);
}

/**
 * Wrapper for a custom validator.
 * @param {ValidationMethod<T>} method Custom validator method.
 * @param {string} name Optional override of the validator name.
 */
export function Validator<T>(method: ValidationMethod<T>, name: string = Validator.name): T {
    const result = <any>(() => {});
    result[sym.Validator] = sym.CustomValidator;
    result[sym.CustomValidator] = method;
    result[sym.Metadata] = { name };
    return result as T;
}

/**
 * Wrapper that can be reused to rename a validator.
 * @param {T} validator Validator.
 * @param {string} name Validator name override.
 */
export function Alias<T>(validator: T, name: string = Alias.name): T {
    (<any>validator)[sym.Metadata].name = name;
    return validator;
}

/**
 * RFC 5322 based email address validator.
 * @see https://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
 */
export function Email() {
    return Alias(RegEx(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/), Email.name);
}

/**
 * Numerical ID validator (integer greater than 0).
 */
export function ID() {
    return Validator((input: any): number => {
        const value = convert.toInt(input);
        assert.isGreaterThan(0, value);
        return value;
    }, ID.name);
}

/**
 * RegEx string match validator.
 * @param {boolean} conversion Optional conversion.
 */
export function RegEx(regEx: RegExp) {
    return Validator((input: any): string => {
        assert.isString(input);
        assert.isRegEx(regEx, input);
        return input;
    }, RegEx.name);
}

/**
 * Integer validator with optional conversion.
 * @param {boolean} conversion Optional conversion.
 */
export function Int(conversion: boolean = false) {
    return Validator((input: any): number => {
        if (conversion)
            return convert.toInt(input)
        else
            assert.isInt(input);
        return input;
    }, Int.name);
}

/**
 * Iso8601 validator with optional conversion.
 * @param {boolean} conversion Optional conversion.
 */
export function Iso8601(conversion: boolean) {
    return Validator((input: any): string => {
        if (conversion)
            return convert.toIso8601(input);

        assert.isString(input);
        assert.isIso8601(input);
        return input;
    }, Iso8601.name);
}

/**
 * Date/Time validator with optional conversion.
 * @param {boolean} conversion Optional conversion.
 */
export function DateTime(conversion: boolean = false) {
    return Validator((input: any): Date => {
        if (conversion)
            return convert.toDate(input)
        else
            assert.isDateString(input);
        return input;
    }, DateTime.name);
}
