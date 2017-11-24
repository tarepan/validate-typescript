export function toInt(input: any): number {
    let value = NaN;
    //todo add extra checks for (additional chars)
    if (typeof input === 'string' || typeof input! === 'number') 
        value = Number.parseInt(input);
    return value;
}

export function toNumber(input: any): number {
    let value = NaN;
    //todo add extra checks for (additional chars)
    if (typeof input === 'string' || typeof input === 'number') 
        value = Number(input);
    return value;
}

export function toBoolean(input: any): boolean | undefined {
    let value: boolean | undefined = undefined;
    if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') 
        value =  Boolean(input);
    //todo throwing exception
    return value;
}

