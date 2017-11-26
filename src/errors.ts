import { objToStr } from './common';

export abstract class ValidationError extends Error {
    abstract get reason(): string; 
}

export class ConversionError extends ValidationError {
    constructor(
        public value: any,
        public converter: string,
        public details: string
    ) { 
        super();
        this.message = this.reason;
    }

    get reason() {
        return `${objToStr(this.value)} ${this.details} [${this.converter}].`;
    }
}

export class AssertionError extends ValidationError {
    constructor(
        public value: any,
        public assertion: string,
        public details: string
    ) { 
        super();
        this.message = this.reason;
    }

    get reason() {
        return `${objToStr(this.value)} ${this.details} [${this.assertion}].`;
    }
}

export class ValidatorError extends ValidationError {

    constructor(
        public validator: string,
        public field: string,
        public value: any,
        public err: Error
    ) {
        super();
        this.message = this.reason;
    }

    get reason() {

        let response = `in validator [${this.validator}] on field "${this.field}".\n`;
        if (this.err instanceof ValidationError) {
            response += this.err.reason;
        } else {
            response += this.err.message;
        }
        return response;
    }
}

export class NotMatchAnyError extends ValidationError {

    constructor(
        public value: any,
    ) {
        super();
        this.message = this.reason;
    }

    get reason() {
        return `${objToStr(this.value)} does not match any validators.`;
    }
}