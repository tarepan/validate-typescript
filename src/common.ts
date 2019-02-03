/**
 * Determines the typename of the provided object.
 * @param {any} obj Object for which the type is to be determined.
 * @returns {string|undefined|null} Object type.
 */
export function objectType(obj: {}): string | undefined | null {
    
    if (isNullOrUndefined(obj)) {
        return obj;
    } else if (isNullOrUndefined(obj.constructor)) {
        return obj.constructor;
    }    
    else return obj.constructor.name;
}

/**
 * Converts an object to string with double space indentation.
 * @param {any} obj Object to be converted to string.
 * @returns {string} Stringified object.
 */
export function objectToString(obj: any): string {
    return JSON.stringify(obj, null, '  ');
}

/**
 * Checks whether a value is undefined.
 * @param {any} value Value to be checked.
 * @returns {boolean} Whether the value is undefined.
 */
export function isUndefined(value: any) : value is undefined {
    return (typeof value === 'undefined');
}

/**
 * Checks whether a value is null.
 * @param {any} value Value to be checked.
 * @returns {boolean} Whether the value is null.
 */
export function isNull(value: any) : value is null {
    return (value === null);
}

/**
 * Checks whether a value is null or undefined.
 * @param {any} value Value to be checked.
 * @returns {boolean} Whether the value is null or undefined.
 */
export function isNullOrUndefined(value: any) : value is null | undefined {
    return isUndefined(value) || isNull(value);
}

/**
 * Checks whether a value is ISO 8601 formatted.
 * @param {string} value Value to be checked.
 * @returns {boolean} Whether the value is ISO 8601 formatted.
 */
export function isIso8601(value: string): boolean {
    let utcMs = Date.parse(value);
    return (!Number.isNaN(utcMs) && (value === (new Date(utcMs)).toISOString()));
}
