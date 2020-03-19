import { objectToString, objectType, isIso8601 as _isIso8601 } from "./common";
import { AssertionError } from "./errors";

export const INVERT = true;

/**
 * Base assertion function
 * @param {boolean} condition Condition to be asserted.
 * @param {boolean} invert Whether the conversion should be inverted.
 * @param {any} value value that is asserted.
 * @param {string} assertion Assertion name.
 * @param {string} details Assertion description.
 * @throws {AssertionError} If the assertion fails.
 */
export function Assert(
  condition: boolean,
  invert: boolean,
  value: any,
  assertion: string,
  details: string
): void {
  let name = (invert ? "isNot" : "is") + assertion.slice(2);
  let messagePrefix = invert ? "is" : "is not";
  let message = `${messagePrefix} ${details}`;
  if (invert ? condition : !condition)
    throw new AssertionError(value, name, message);
}

/**
 * Object type assertion.
 * @param {any} target Reference object.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isSameType(
  target: any,
  value: any,
  invert: boolean = false
): void {
  let targetType = objectType(target);
  let valueType = objectType(value);
  Assert(
    targetType === valueType,
    invert,
    valueType,
    isSameType.name,
    `the same type as ${objectToString(targetType)}`
  );
}

/**
 * Object type name assertion.
 * @param {string} target Reference object type name.
 * @param {string} value Object type name being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isSameTypeName(
  target: string,
  value: string,
  invert: boolean = false
): void {
  Assert(
    target === value,
    invert,
    value,
    isSameTypeName.name,
    `the same type as ${objectToString(target)}`
  );
}

/**
 * Equality assertion.
 * @param {any} target Reference object.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isEqual(
  target: any,
  value: any,
  invert: boolean = false
): void {
  Assert(
    target === value,
    invert,
    value,
    isEqual.name,
    `equal to ${objectToString(target)}`
  );
}

/**
 * Symbol assertion.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isSymbol(value: string, invert: boolean = false): void {
  Assert(typeof value === "symbol", invert, value, isSymbol.name, "a symbol");
}

/**
 * Boolean assertion.
 * @param {boolean} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isBoolean(value: boolean, invert: boolean = false): void {
  Assert(
    typeof value === "boolean",
    invert,
    value,
    isBoolean.name,
    "a boolean"
  );
}

/**
 * String assertion.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isString(value: string, invert: boolean = false): void {
  Assert(typeof value === "string", invert, value, isString.name, "a string");
}

/**
 * Numeric assertion.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isNumber(value: number, invert: boolean = false): void {
  Assert(!Number.isNaN(value), invert, value, isNumber.name, "a number");
}

/**
 * Integer assertion.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isInt(value: number, invert: boolean = false): void {
  Assert(Number.isInteger(value), invert, value, isInt.name, "an integer");
}

/**
 * Float assertion.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 * @todo Update
 */
export function isFloat(value: number, invert: boolean = false): void {
  Assert(!Number.isNaN(value), invert, value, isFloat.name, "a float");
}

/**
 * Numeric equality assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isEqualTo(
  target: number,
  value: number,
  invert: boolean = false
): void {
  Assert(value == target, invert, value, isEqualTo.name, `== ${target}`);
}

/**
 * Numeric greater than assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isGreaterThan(
  target: number,
  value: number,
  invert: boolean = false
): void {
  Assert(value > target, invert, value, isGreaterThan.name, `> ${target}`);
}

/**
 * Numeric greater than or equal to assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isGreaterThanOrEqualTo(
  target: number,
  value: number,
  invert: boolean = false
): void {
  Assert(
    value >= target,
    invert,
    value,
    isGreaterThanOrEqualTo.name,
    `>= ${target}`
  );
}

/**
 * Numeric less than or equal to assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isLessThanOrEqualTo(
  target: number,
  value: number,
  invert: boolean = false
): void {
  Assert(
    value <= target,
    invert,
    value,
    isLessThanOrEqualTo.name,
    `>= ${target}`
  );
}

/**
 * Numeric less than assertion.
 * @param {number} target Reference number.
 * @param {number} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isLessThan(
  target: number,
  value: number,
  invert: boolean = false
): void {
  Assert(value < target, invert, value, isLessThan.name, `< ${target}`);
}

/**
 * Array assertion.
 * @param {any[]} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isArray(value: any[], invert: boolean = false): void {
  Assert(Array.isArray(value), invert, value, isArray.name, "an array");
}

/**
 * Null assertion.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isNull(value: any, invert: boolean = false): void {
  Assert(value === null, invert, value, isNull.name, "null");
}

/**
 * Object assertion.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isObject(value: any, invert: boolean = false): void {
  Assert(typeof value === "object", invert, value, isObject.name, "an object");
}

/**
 * Undefined assertion.
 * @param {any} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isUndefined(value: number, invert: boolean = false): void {
  Assert(
    typeof value === "undefined",
    invert,
    value,
    isUndefined.name,
    "undefined"
  );
}

/**
 * RegEx assertion.
 * @param {RegExp} regEx Regular expression to be matched.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isRegEx(
  regEx: RegExp,
  value: string,
  invert: boolean = false
): void {
  Assert(
    regEx.test(value),
    invert,
    value,
    isRegEx.name,
    `a regular expression match`
  );
}

/**
 * Date string assertion.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isDateString(value: string, invert: boolean = false): void {
  Assert(
    isNaN(Date.parse(value)),
    invert,
    value,
    isRegEx.name,
    `a regular expression match`
  );
}

/**
 * ISO 8601 assertion.
 * @param {string} value Value being asserted.
 * @param {boolean} invert Whether the assertion should be inverted.
 * @throws {AssertionError} If the assertion fails.
 */
export function isIso8601(value: string, invert: boolean = false): void {
  Assert(
    _isIso8601(value),
    invert,
    value,
    isIso8601.name,
    `an ISO8601 date match`
  );
}
