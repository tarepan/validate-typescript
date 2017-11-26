
export abstract class ValidationError extends Error {
    abstract readonly reason: string;
}

export class ConversionError extends ValidationError {
    public value: any;
    public converter: string;
    public details: string;
    readonly reason: string;
}


export class AssertionError extends ValidationError {
    public value: any;
    public assertion: string;
    public details: string;
    readonly reason: string;
}

export class ValidatorError extends ValidationError {
    public validator: string;
    public field: string;
    public value: any;
    public err: Error;
    readonly reason: string;
}

export class NotMatchAnyError extends ValidationError {
    public value: any;
    readonly reason: string;
}