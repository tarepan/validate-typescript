import { Either } from "fp-ts/lib/Either";
/**
 * Validator where the schema is an object. This is used, specifically for validating
 * null, array and object types.
 *
 * For null validation, the value must match the schema value of null.
 *
 * For array validation each element of the array needs to be successfully validated. Multiple
 * schemas can be provided but only one of them neds to succeed. Synonymous to the "any"
 * validator.
 *
 * For object validation, all the properties provided in the schema need to be provided in the
 * value object. To be validated, all the properties need to be validated successfully.
 * @param {T} schema The validation schema (object).
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {T} When validation succeeds.
 * @throws {ValidatorError} When validation fails.
 */
export declare function ValidateObject<T>(schema: T, value: any, property: string): T;
/**
 * Validator where the schema is a function. This is used, specifically for validating based on
 * type, multiple schema options and custom validators. The function serves as a wrapper to
 * simplify the API.
 *
 * For type validation, the class name of the value must match the class name of the schema.
 *
 * For options validation, an array of schemas are provided. If the option is any, then only one
 * of the schemas need to match to validate successfully. If the option is all, then all of the
 * schemas need to match to validate successfully.
 *
 * For custom validator validation, the custom validator function is called with the value and
 * property as parameters.
 * @param {T} schema The validation schema (function).
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {T} When validation succeeds.
 * @throws {ValidatorError} When validation fails.
 */
export declare function ValidateFunction<T extends Function>(schema: T, value: any, property: string): T;
/**
 * Validator where the schema is a literal string, thus the variable (value) is expected to be a
 * string and have the same string value as the schema.
 * @param {string} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {string} When validation succeeds.
 * @throws {ValidatorError} When the value is either not a string or the string value differs
 * from that of the schema (failed validation).
 */
export declare function LiteralString(schema: string, value: any, property: string): string;
/**
 * Validator where the schema is a literal number, thus the variable (value) is expected to be a
 * number and have the same numeric value as the schema.
 * @param {number} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {number} When validation succeeds.
 * @throws {ValidatorError} When the value is either not a number or the numeric value differs
 * from that of the schema (failed validation).
 */
export declare function LiteralNumber(schema: number, value: any, property: string): number;
/**
 * Validator where the schema is a literal boolean, thus the variable (value) is expected to be a
 * boolean and have the same boolean value as the schema.
 * @param {boolean} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {boolean} When validation succeeds.
 * @throws {ValidatorError} When the value is either not a boolean or the boolean value differs
 * from that of the schema (failed validation).
 */
export declare function LiteralBoolean(schema: boolean, value: any, property: string): boolean;
/**
 * Validator where the schema is a literal symbol, thus the variable (value) is expected to be a
 * symbol and have the same symbolic value as the schema.
 * @param {symbol} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {symbol} When validation succeeds.
 * @throws {ValidatorError} When the value is either not a symbol or the symbolic value differs
 * from that of the schema (failed validation).
 */
export declare function LiteralSymbol(schema: symbol, value: any, property: string): symbol;
/**
 * Validator where the schema is undefined, thus the variable (value) is expected to be undefined
 * too.
 * @param {undefined} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {undefined} When validation succeeds.
 * @throws {ValidatorError} When the value is not undefined (failed validation).
 */
export declare function Undefined(schema: undefined, value: any, property: string): undefined;
/**
 * Validator where the schema is null, thus the variable (value) is expected to be null too.
 * @param {null} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @returns {null} When validation succeeds.
 * @throws {ValidatorError} When the value is not null (failed validation).
 */
export declare function Null(schema: null, value: any, property: string): null;
/**
 * Validator where the schema has a native type that has not been catered for.
 * @param {T} schema The validation schema.
 * @param {any} value Variable (value) to be validated.
 * @param {string} property Name of the variable (value) being validated, for detailed logging.
 * @throws {ValidatorError} This caters for the scenario where a native type is not catered for.
 */
export declare function Unknown<T>(schema: T, value: any, property: string): T;
/**
 * Validates a variable (value) according to a validation schema (type T).
 * @param schema - The validation schema.
 * @param value - Variable (value) to be validated.
 * @param name - Name of the variable (value) being validated, for detailed logging.
 * @param {Function(string)} log Validation error logger, takes a string input.
 * @returns The original value cast to type T if validation succeeded.
 * @throws Validation error.
 */
export declare function validate<T>(schema: T, value: any, name?: string, log?: any): T;
/**
 * Validates a variable according to a schema.
 * @param schema - The validation schema.
 * @param value - Variable (value) to be validated.
 * @param name - Name of the variable (value) being validated, for detailed logging.
 * @param {Function(string)} log Validation error logger, takes a string input.
 * @returns Either monad which contain type-checked value or Error
 */
export declare function validateE<T>(schema: T, value: any, name?: string, log?: any): Either<Error, T>;
