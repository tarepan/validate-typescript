export declare function propRef(prop: string, validator: string): string;
/**
 * @description RFC 5322 based email address validation
 * @see https://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
 */
export declare function Email(): string;
export declare function ID(): number;
export declare function RegEx(regEx: RegExp): string;
export declare function Int(conversion?: boolean): number;
export declare function Iso8601(conversion: boolean): string;
export declare function DateTime(conversion?: boolean): Date;
export declare function Date(): void;
