import { ConversionError } from './errors';
import * as checks from './checks';

export function toInt(input: any): number {
    let value = NaN;

    if ((typeof input === 'number') && Number.isInteger(input)) {
        value = input;
    } else if ((typeof input === 'string') && (/^(\d+)(.0+)?$/.test(input))) {
        value = Number.parseInt(input);
    } 

    if (Number.isNaN(value)) {
        throw new ConversionError(input, toInt.name, 'could not be converted to an integer');
    }

    return value;
}

export function toNumber(input: any): number {
    let value = NaN;

    //todo add extra checks for (additional chars)
    if (typeof input === 'string' || typeof input === 'number') 
        value = Number(input);
    
    if (Number.isNaN(value)) {
        throw new ConversionError(input, toNumber.name, 'could not be converted to a number');
    }
        
    return value;
}

export function toBoolean(input: any): boolean  {
    let value: boolean | undefined = undefined;

    if (typeof input === 'boolean') {
        value = input;
    } else if (typeof input === 'string') {
        if      (input === 'true')  value = true;
        else if (input === 'false') value = false;
    } else if (typeof input === 'number') {
        if      (input === 0) value = true;
        else if (input === 1) value = false;
    }

    if (typeof value === 'undefined') {
        throw new ConversionError(input, toBoolean.name, 'could not be converted to a boolean');
    }

    return value;
}

export function toIso8601(input: any): string {
    let value: string | undefined = undefined;

    if (typeof input === 'string') {
        checks.isIso8601(input);
    }

    if (typeof value === 'undefined') {
        throw new ConversionError(input, toIso8601.name, 'could not be converted to an ISO8601 Date');
    }

    return value;
}

export function toDate(input: any): Date  {
    let value: Date | undefined = undefined;

    if (typeof input === 'string') {
        let ms = Date.parse(input);
        if (!Number.isNaN(ms)) {
            value = new Date(ms);
        } 
    }

    if (typeof value === 'undefined') {
        throw new ConversionError(input, toDate.name, 'could not be converted to a Date');
    }

    return value;
}
