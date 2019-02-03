/**
 * Tags a function as a validator.
 */
export const Validator = Symbol("validator") as symbol;

/**
 * Tags additional metadata to a function validator
 */
export const Metadata = Symbol("metadata") as symbol;

/**
 * Tags a validator function as a Type validator.
 * @example Type(String)
 */
export const TypeValidator = Symbol("type-validator") as symbol;

/**
 * Tags a validator function as a Options validator.
 * @example Any, All
 */
export const OptionsValidator = Symbol("options-validator") as symbol;

/**
 * Tags a validator function as a Custom validator.
 */
export const CustomValidator = Symbol("custom-validator") as symbol;
