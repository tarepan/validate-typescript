import { ConversionError } from './error';

export function toInt(input: any): number {
    let value = NaN;

    //todo add extra checks for (additional chars)
    if (typeof input === 'string' || typeof input! === 'number') 
        value = Number.parseInt(input);
    else throw new ConversionError(input, toInt.name, 'could not be converted to an integer');
    return value;
}

export function toNumber(input: any): number {
    let value = NaN;

    //todo add extra checks for (additional chars)
    if (typeof input === 'string' || typeof input === 'number') 
        value = Number(input);
    else throw new ConversionError(input, toNumber.name, 'could not be converted to a number');

    return value;
}

export function toBoolean(input: any): boolean | undefined {
    let value: boolean | undefined = undefined;

    if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') 
        value =  Boolean(input); // todo not valid
    else throw new ConversionError(input, toBoolean.name, 'could not be converted to a boolean');

    return value;
}

