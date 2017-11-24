export function nullOrUndef(value: any) {
    return (value === null || typeof value === 'undefined');
}

export function objectType(obj: {}): string | null {
    if (nullOrUndef(obj) || nullOrUndef(obj.constructor))
        return null;
    else return obj.constructor.name;
}