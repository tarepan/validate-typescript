/**
 * Convert to integer if possible.
 * @param {any} input Value to be converted.
 * @throws {ConversionError} If conversion fails.
 */
export declare function toInt(input: any): number;
/**
 * Convert to number if possible.
 * @param {any} input Value to be converted.
 * @throws {ConversionError} If conversion fails.
 * @todo add extra checks for (additional chars)
 */
export declare function toNumber(input: any): number;
/**
 * Convert to boolean if possible.
 * @param {any} input Value to be converted.
 * @throws {ConversionError} If conversion fails.
 */
export declare function toBoolean(input: any): boolean;
/**
 * Convert to ISO 8601 if possible.
 * @param {any} input Value to be converted.
 * @throws {ConversionError} If conversion fails.
 */
export declare function toIso8601(input: any): string;
/**
 * Convert to date if possible.
 * @param {any} input Value to be converted.
 * @throws {ConversionError} If conversion fails.
 */
export declare function toDate(input: any): Date;
