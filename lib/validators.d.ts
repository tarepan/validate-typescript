export declare enum ValidationOptions {
    any = 0,
    all = 1
}
export declare type ValidationMethod<T> = (input: any, property: string) => T;
/**
 * Validator that checks that the value provided is a primitive type.
 * @param {() => T} ctor Primitive type constructor (e.g. String).
 * @param {string} name Optional override of the validator name.
 */
export declare function Primitive<T>(ctor: () => T, name?: string): T;
/**
 * Validator that checks that the value provided is of the specified type.
 * @param {() => A | () => B} ctor Type constructor (e.g. MyOwnClass).
 * @param {string} name Optional override of the validator name.
 * @todo Try simplify ctor type.
 */
export declare function Type<A, B>(ctor: (() => A) | (new () => B), name?: string): B;
/**
 * Validator that supports multiple schemas.
 *
 * The any or all option is used to ensure that only one or all of the schemas need to validate
 * successfully.
 * @param {T[]} schemas Multiple validation schemas.
 * @param {string} name Optional override of the validator name.
 * @param {ValidationOptions} option Selects all/any validation.
 */
export declare function Options<T>(schemas: T[], name?: string, option?: ValidationOptions): T;
/**
 * Shorthand variant of Options with the option field set to any.
 * @param {T[]} schemas Multiple validation schemas.
 * @param {string} name Optional override of the validator name.
 */
export declare function Any<T>(schemas: T[], name?: string): T;
/**
 * Shorthand variant of Options with the option field set to all.
 * @param {T[]} schemas Multiple validation schemas.
 * @param {string} name Optional override of the validator name.
 */
export declare function All<T>(schemas: T[], name?: string): T;
/**
 * Validator that is with an optional schema. Validation will succeed if undefined is passed as a
 * value.
 * @param {T} schema Validation schemas.
 * @param {string} name Optional override of the validator name.
 */
export declare function Optional<T>(schema: T, name?: string): T | undefined;
/**
 * Validator that is with a nullable schema. Validation will succeed if null is passed as a value.
 * @param {T} schema Validation schemas.
 * @param {string} name Optional override of the validator name.
 */
export declare function Nullable<T>(schema: T, name?: string): T | null;
/**
 * Wrapper for a custom validator.
 * @param {ValidationMethod<T>} method Custom validator method.
 * @param {string} name Optional override of the validator name.
 */
export declare function Validator<T>(method: ValidationMethod<T>, name?: string): T;
/**
 * Wrapper that can be reused to rename a validator.
 * @param {T} validator Validator.
 * @param {string} name Validator name override.
 */
export declare function Alias<T>(validator: T, name?: string): T;
/**
 * RFC 5322 based email address validator.
 * @see https://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
 */
export declare function Email(): string;
/**
 * Numerical ID validator (integer greater than 0).
 */
export declare function ID(): number;
/**
 * RegEx string match validator.
 * @param {boolean} conversion Optional conversion.
 */
export declare function RegEx(regEx: RegExp): string;
/**
 * Integer validator with optional conversion.
 * @param {boolean} conversion Optional conversion.
 */
export declare function Int(conversion?: boolean): number;
/**
 * Iso8601 validator with optional conversion.
 * @param {boolean} conversion Optional conversion.
 */
export declare function Iso8601(conversion: boolean): string;
/**
 * Date/Time validator with optional conversion.
 * @param {boolean} conversion Optional conversion.
 */
export declare function DateTime(conversion?: boolean): Date;
