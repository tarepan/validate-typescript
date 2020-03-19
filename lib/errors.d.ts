/**
 * Super base class for `extends Error` TS issue
 * https://github.com/grant-zietsman/validate-typescript/issues/5
 */
declare class ErrorInternal {
    name: string;
    message: string;
    constructor(message?: string);
}
/**
 * Base class from which validation errors are derived.
 */
export declare abstract class ValidationError extends ErrorInternal {
    constructor();
    /**
     * Error trace property (string).
     */
    get trace(): string;
    /**
     * Explanitory error string.
     * @param {number} count Error stack depth, used for indentation (string formatting).
     * @returns {string} Formatted validation error reason.
     */
    abstract reason(count?: number): string;
    /**
     * Indentation generator.
     * @param {number} count Indentation depth.
     * @param {string} message Message to be indented.
     * @returns {string} Indentation prefix.
     */
    indent(count: number, message: string): string;
}
/**
 * Error class used to express conversion errors.
 */
export declare class ConversionError extends ValidationError {
    value: any;
    converter: string;
    details: string;
    constructor(value: any, converter: string, details: string);
    /**
     * Explanitory conversion error string.
     * @param {number} count Error stack depth, used for indenting (string formatting).
     * @returns {string} Formatted conversion error reason.
     */
    reason(count?: number): string;
}
/**
 * Error class used to express assertion errors.
 */
export declare class AssertionError extends ValidationError {
    value: any;
    assertion: string;
    details: string;
    constructor(value: any, assertion: string, details: string);
    /**
     * Explanitory assertion error string.
     * @param {number} count Error stack depth, used for indenting (string formatting).
     * @returns {string} Formatted assertion error reason.
     */
    reason(count?: number): string;
}
/**
 * Error class used to express validator errors.
 */
export declare class ValidatorError extends ValidationError {
    validator: string;
    property: string;
    value: any;
    child_error: Error;
    constructor(validator: string, property: string, value: any, child_error: Error);
    /**
     * Explanitory validator error string.
     * @param count - Error stack depth, used for indenting (string formatting).
     * @returns Formatted validator error reason.
     */
    reason(count?: number): string;
}
/**
 * Error class used to express multiple validation errors (e.g. arrays).
 */
export declare class MultipleValidationError extends ValidationError {
    value: any;
    child_errors: Error[];
    constructor(value: any, child_errors?: Error[]);
    /**
     * Explanitory validation error string.
     * @param {number} count Error stack depth, used for indenting (string formatting).
     * @returns {string} Formatted validation error reason.
     */
    reason(count?: number): string;
}
/**
 * Error class used to express not match any errors (e.g. optional and any validators).
 */
export declare class NotMatchAnyError extends ValidationError {
    value: any;
    child_errors: Error[];
    constructor(value: any, child_errors?: Error[]);
    /**
     * Explanitory "not match any" error string.
     * @param {number} count Error stack depth, used for indenting (string formatting).
     * @returns {string} Formatted "not match any" error reason.
     */
    reason(count?: number): string;
}
export {};
