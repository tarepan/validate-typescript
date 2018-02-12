export declare abstract class ValidationError extends Error {
    readonly abstract reason: string;
}
export declare class ConversionError extends ValidationError {
    value: any;
    converter: string;
    details: string;
    constructor(value: any, converter: string, details: string);
    readonly reason: string;
}
export declare class AssertionError extends ValidationError {
    value: any;
    assertion: string;
    details: string;
    constructor(value: any, assertion: string, details: string);
    readonly reason: string;
}
export declare class ValidatorError extends ValidationError {
    validator: string;
    field: string;
    value: any;
    err: Error;
    constructor(validator: string, field: string, value: any, err: Error);
    readonly reason: string;
}
export declare class NotMatchAnyError extends ValidationError {
    value: any;
    constructor(value: any);
    readonly reason: string;
}
