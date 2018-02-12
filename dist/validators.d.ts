export declare enum ValidationOptions {
    any = 0,
    all = 1,
}
export declare type ValidationMethod<T> = (input: any) => T;
export declare function Primitive<T>(ctor: (() => T)): T;
export declare function Type<A, B>(ctor: ((() => A) | (new () => B))): B;
export declare function Options<T>(schemas: T[], name?: string, option?: ValidationOptions): T;
export declare function Any<T>(schemas: T[], name?: string): T;
export declare function All<T>(schemas: T[], name?: string): T;
export declare function Optional<T>(schema: T, name?: string): T | undefined;
export declare function Nullable<T>(schema: T, name?: string): T | null;
export declare function Validator<T>(method: ValidationMethod<T>, name?: string): T;
export declare function Alias<T>(validator: T, name?: string): T;
