/**
 * Determines the typename of the provided object.
 * @param {any} obj Object for which the type is to be determined.
 * @returns {string|undefined|null} Object type.
 */
export declare function objectType(obj: {}): string | undefined | null;
/**
 * Converts an object to string with double space indentation.
 * @param {any} obj Object to be converted to string.
 * @returns {string} Stringified object.
 */
export declare function objectToString(obj: any): string;
/**
 * Checks whether a value is undefined.
 * @param {any} value Value to be checked.
 * @returns {boolean} Whether the value is undefined.
 */
export declare function isUndefined(value: any): value is undefined;
/**
 * Checks whether a value is null.
 * @param {any} value Value to be checked.
 * @returns {boolean} Whether the value is null.
 */
export declare function isNull(value: any): value is null;
/**
 * Checks whether a value is null or undefined.
 * @param {any} value Value to be checked.
 * @returns {boolean} Whether the value is null or undefined.
 */
export declare function isNullOrUndefined(value: any): value is null | undefined;
/**
 * Checks whether a value is ISO 8601 formatted.
 * @param {string} value Value to be checked.
 * @returns {boolean} Whether the value is ISO 8601 formatted.
 */
export declare function isIso8601(value: string): boolean;
