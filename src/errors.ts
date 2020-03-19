import chalk from "chalk";
import { objectToString } from "./common";

/**
 * Super base class for `extends Error` TS issue
 * https://github.com/grant-zietsman/validate-typescript/issues/5
 */
class ErrorInternal {
  name: string;
  message: string;
  constructor(message: string = "") {
    this.name = "validate-typescript_ErrorInternal";
    this.message = message;
  }
}

/**
 * Base class from which validation errors are derived.
 */
export abstract class ValidationError extends ErrorInternal {
  constructor() {
    super();
    this.message = "Validate TypeScript";
  }

  /**
   * Error trace property (string).
   */
  public get trace() {
    return this.reason();
  }

  /**
   * Explanitory error string.
   * @param {number} count Error stack depth, used for indentation (string formatting).
   * @returns {string} Formatted validation error reason.
   */
  public abstract reason(count?: number): string;

  /**
   * Indentation generator.
   * @param {number} count Indentation depth.
   * @param {string} message Message to be indented.
   * @returns {string} Indentation prefix.
   */
  public indent(count: number, message: string): string {
    return ("\n" + message).replace(/\n/g, "\n" + "  ".repeat(count));
  }
}

/**
 * Error class used to express conversion errors.
 */
export class ConversionError extends ValidationError {
  constructor(
    public value: any,
    public converter: string,
    public details: string
  ) {
    super();
  }

  /**
   * Explanitory conversion error string.
   * @param {number} count Error stack depth, used for indenting (string formatting).
   * @returns {string} Formatted conversion error reason.
   */
  public reason(count: number = 0) {
    return (
      this.indent(
        count,
        `${chalk.yellowBright(`[Conversion: ${this.converter}]`)}\n${chalk.bold(
          `${objectToString(this.value)} ${this.details}.`
        )}`
      ) + "\n"
    );
  }
}

/**
 * Error class used to express assertion errors.
 */
export class AssertionError extends ValidationError {
  constructor(
    public value: any,
    public assertion: string,
    public details: string
  ) {
    super();
  }

  /**
   * Explanitory assertion error string.
   * @param {number} count Error stack depth, used for indenting (string formatting).
   * @returns {string} Formatted assertion error reason.
   */
  public reason(count: number = 0) {
    return (
      this.indent(
        count,
        `${chalk.greenBright(`[Assertion: ${this.assertion}]`)}\n${chalk.bold(
          `${objectToString(this.value)} ${this.details}.`
        )}`
      ) + "\n"
    );
  }
}

/**
 * Error class used to express validator errors.
 */
export class ValidatorError extends ValidationError {
  constructor(
    public validator: string,
    public property: string,
    public value: any,
    public child_error: Error
  ) {
    super();
  }

  /**
   * Explanitory validator error string.
   * @param count - Error stack depth, used for indenting (string formatting).
   * @returns Formatted validator error reason.
   */
  public reason(count: number = 0): string {
    let response = this.indent(
      count,
      `${chalk.blueBright(
        `[Validator: ${this.validator}]`
      )} on property ${chalk.redBright(`${this.property}`)}`
    );

    if (this.child_error instanceof ValidationError) {
      response += this.child_error.reason(count + 1);
    }

    return response;
  }
}

/**
 * Error class used to express multiple validation errors (e.g. arrays).
 */
export class MultipleValidationError extends ValidationError {
  constructor(public value: any, public child_errors: Error[] = []) {
    super();
  }

  /**
   * Explanitory validation error string.
   * @param {number} count Error stack depth, used for indenting (string formatting).
   * @returns {string} Formatted validation error reason.
   */
  public reason(count: number = 0) {
    let response = "";

    const max = 3;
    let more = 0;

    if (this.child_errors.length > max) {
      more = this.child_errors.length - max;
      this.child_errors = this.child_errors.slice(1, max);
    }

    for (let child_error of this.child_errors) {
      if (child_error instanceof ValidationError) {
        response += child_error.reason(count);
      }
    }

    if (more > 0) {
      response += this.indent(
        count,
        `${chalk.redBright(`[+${more} error${more > 1 ? "s" : ""}]`)}\n`
      );
    }

    return response;
  }
}

/**
 * Error class used to express not match any errors (e.g. optional and any validators).
 */
export class NotMatchAnyError extends ValidationError {
  constructor(public value: any, public child_errors: Error[] = []) {
    super();
  }

  /**
   * Explanitory "not match any" error string.
   * @param {number} count Error stack depth, used for indenting (string formatting).
   * @returns {string} Formatted "not match any" error reason.
   */
  public reason(count: number = 0) {
    let response = "";

    response += "\n";
    for (let child_error of this.child_errors) {
      if (child_error instanceof ValidationError) {
        const option = this.child_errors.indexOf(child_error) + 1;
        response += this.indent(
          count,
          `${chalk.magentaBright(`[Option: ${option}]`)}\n`
        );
        response += child_error.reason(count + 1);
      }
    }

    return response;
  }
}
