"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tags a function as a validator.
 */
exports.Validator = Symbol("validator");
/**
 * Tags additional metadata to a function validator
 */
exports.Metadata = Symbol("metadata");
/**
 * Tags a validator function as a Type validator.
 * @example Type(String)
 */
exports.TypeValidator = Symbol("type-validator");
/**
 * Tags a validator function as a Options validator.
 * @example Any, All
 */
exports.OptionsValidator = Symbol("options-validator");
/**
 * Tags a validator function as a Custom validator.
 */
exports.CustomValidator = Symbol("custom-validator");
//# sourceMappingURL=symbols.js.map