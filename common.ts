export function nullOrUndef(value: any) {
    return (value === null || typeof value === 'undefined');
}

export function objectType(obj: {}): string | undefined {
    if (nullOrUndef(obj) || nullOrUndef(obj.constructor))
        return undefined;
    else return obj.constructor.name;
}

export function objToStr(obj: any): string {
    return JSON.stringify(obj, null, '  ');
}