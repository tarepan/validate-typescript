export enum ValidationOptions {
    any = 0,
    all,
}

export type ValidationMethod<T> = (input: any) => T;

export function Type<A, B>(ctor: ((() => A) | (new () => B))): B;
export function Options<T>(schemas: T[], name?: string, option?: ValidationOptions): T;
export function Any<T>(schemas: T[], name?: string): T;
export function All<T>(schemas: T[], name?: string): T;
export function Optional<T>(schema: T, name?: string): T | undefined;
export function Nullable<T>(schema: T, name?: string): T | null;
export function Validator<T>(method: ValidationMethod<T>, name?: string): T;
export function Alias<T>(validator: T, name?: string): T;
