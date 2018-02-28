export function objectType(obj: {}): string | undefined | null {
    
    if (isNullOrUndefined(obj)) {
        return obj;
    } else if (isNullOrUndefined(obj.constructor)) {
        return obj.constructor;
    }    
    else return obj.constructor.name;
}

export function objectToString(obj: any): string {
    return JSON.stringify(obj, null, '  ');
}

export function isUndefined(value: any) : value is undefined {
    return (typeof value === 'undefined');
}

export function isNull(value: any) : value is null {
    return (typeof value === null);
}

export function isNullOrUndefined(value: any) : value is null | undefined {
    return isUndefined(value) || isNull(value);
}