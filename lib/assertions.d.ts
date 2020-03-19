export declare const INVERT = true;
/**
 * Base assertion function
 * @param {boolean} condition Condition to be asserted.
 * @param {boolean} invert Whether the conversion should be inverted.
 * @param {any} value value that is asserted.
 * @param {string} assertion Assertion name.
 * @param {string} details Assertion description.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function Assert(condition: boolean, invert: boolean, value: any, assertion: string, details: string): void;
/**
 * Object type assertion.
 * @param {any} target Reference object.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isSameType(target: any, value: any, invert?: boolean): void;
/**
 * Object type name assertion.
 * @param {string} target Reference object type name.
 * @param {string} value Object type name being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isSameTypeName(target: string, value: string, invert?: boolean): void;
/**
 * Equality assertion.
 * @param {any} target Reference object.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isEqual(target: any, value: any, invert?: boolean): void;
/**
 * Symbol assertion.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isSymbol(value: string, invert?: boolean): void;
/**
 * Boolean assertion.
 * @param {boolean} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isBoolean(value: boolean, invert?: boolean): void;
/**
 * String assertion.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isString(value: string, invert?: boolean): void;
/**
 * Numeric assertion.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isNumber(value: number, invert?: boolean): void;
/**
 * Integer assertion.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isInt(value: number, invert?: boolean): void;
/**
 * Float assertion.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 * @todo Update
 */
export declare function isFloat(value: number, invert?: boolean): void;
/**
 * Numeric equality assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isEqualTo(target: number, value: number, invert?: boolean): void;
/**
 * Numeric greater than assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isGreaterThan(target: number, value: number, invert?: boolean): void;
/**
 * Numeric greater than or equal to assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isGreaterThanOrEqualTo(target: number, value: number, invert?: boolean): void;
/**
 * Numeric less than or equal to assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isLessThanOrEqualTo(target: number, value: number, invert?: boolean): void;
/**
 * Numeric less than assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isLessThan(target: number, value: number, invert?: boolean): void;
/**
 * Array assertion.
 * @param {any[]} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isArray(value: any[], invert?: boolean): void;
/**
 * Null assertion.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isNull(value: any, invert?: boolean): void;
/**
 * Object assertion.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isObject(value: any, invert?: boolean): void;
/**
 * Undefined assertion.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isUndefined(value: number, invert?: boolean): void;
/**
 * RegEx assertion.
 * @param {RegExp} regEx Regular expression to be matched.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isRegEx(regEx: RegExp, value: string, invert?: boolean): void;
/**
 * Date string assertion.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isDateString(value: string, invert?: boolean): void;
/**
 * ISO 8601 assertion.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export declare function isIso8601(value: string, invert?: boolean): void;
