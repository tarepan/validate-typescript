import * as assert  from './assertions';
import * as sym from './symbols';
import { objectType } from './common';
import { CustomValidationError } from './error';

export function validateObject<T>(schema: T, input: any, name: string): T {

    // Null Validation
    if (schema === null) {
        assert.isNull(input);
        return input;
    }

    // Array Validation
    if (Array.isArray(schema)) {
        assert.isArray(input);
        let memIdx = 0;
        for (const member of input) {
            let idx = 0;
            for (const prop of schema) {
                try {
                    input[memIdx] = validateRecursive(prop, member, `${name}[${idx++}]`);
                    break;
                } catch {
                    if (idx === schema.length) {
                        throw new Error(`${name} ${JSON.stringify(member, null, '  ')} does not match array schema`);
                    }
                }
            }
            memIdx++;
        }

    // Object Validation
    } else {
        assert.isNonNullObject(input);
        for (const prop of Object.getOwnPropertyNames(schema)) {
            input[prop] = validateRecursive((<any>schema)[prop], input[prop], `${name}.${prop}`);
        }
    }

    return input;
};

export function validateFunction<T extends () => {}>(schema: T, input: any, name: string): T {

    // Type Validation
    if ((<any>schema)[sym.Validator] === sym.TypeValidator) {
        let type = objectType(input);
        let schemaType = (<any>schema)[sym.TypeValidator];
        if (type) {
            if (type !== schemaType) throw new Error(`type mismatch ${schemaType} - ${type}`);
        }
        else throw new Error('type mismatch');
    }

    // Options Validation
    else if ((<any>schema)[sym.Validator] === sym.OptionsValidator) {
        let idx = 0;
        for (const subSchema of (<any>schema)[sym.OptionsValidator]) {
            try {
                idx++;
                input = validateRecursive(subSchema, input, name);
                break;
            }
            catch {
                if (idx === (<any>schema)[sym.OptionsValidator].length) {
                    throw new Error(`${name} ${JSON.stringify(input, null, '  ')} does not match schema options`);
                }
            }            
        }
    }

    // Custom Validation
    else if ((<any>schema)[sym.Validator] === sym.CustomValidator) {
        try {
            input = (<any>schema)[sym.CustomValidator](input, name);
        } catch(ex) {
            throw new CustomValidationError(
                (<any>schema)[sym.Metadata],
                name,
                input,
                ex,
            );
            /*
            Error(JSON.stringify({
                validator: ,
                field: name,
                assertion: ex.assertion,
                value: ex.value,
                message: ex.message,
            }, null, '  '));*/
            //throw new Error(`in validator: ${(<any>schema)[sym.Metadata]}\n${ex.message}`)
        }
    }

    return input;
};
    
    
export function validateString(schema: string, input: any, name: string): string {
    // try catch name
    assert.isString(input);
    assert.isEqual(schema, input);
    return input;
};

export function validateNumber(schema: number, input: any, name: string): number {
    assert.isNumber(input);
    assert.isEqual(schema, input);
    return input;
};

export function validateBoolean(schema: boolean, input: any, name: string): boolean {
    assert.isBoolean(input);
    assert.isEqual(schema, input);
    return input;
};

export function validateSymbol(schema: symbol, input: any, name: string): symbol {
    //todo
    return input;
};

export function validateUndefined(schema: undefined, input: any, name: string): undefined {
    assert.isUndefined(input);
    return input;
};

export function validateDefault<T>(schema: T, input: any, name: string): T {
    //todo
    return input;
};

function validateRecursive<T>(schema: T, input: any, name: string): T {

    if (typeof schema === 'object') {
        input = validateObject(schema, input, name);
    } else if (typeof schema === 'function') {
        input = validateFunction(schema, input, name);
    } else if (typeof schema === 'string') {
        input = validateString(schema, input, name);
    } else if (typeof schema === 'number') {
        input = validateNumber(schema, input, name);
    } else if (typeof schema === 'boolean') {
        input = validateBoolean(schema, input, name);
    } else if (typeof schema === 'symbol') {
        input = validateSymbol(schema, input, name);
    } else if (typeof schema === 'undefined') {
        input = validateUndefined(schema, input, name);
    } else {
        input = validateDefault(schema, input, name);
    }

    return input;
}

export function validate<T>(schema: T, input: any, name: string = 'input'): T {

    try {
        validateRecursive(schema, input, name);
    } catch(ex) {
        //if ()
        //let s = 's';
 //       throw new Error(ex.message);
        throw new Error(ex.message);        
    }   

    return input;
}