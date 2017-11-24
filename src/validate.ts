import * as assert  from './assertions';
import * as sym from './symbols';
import { objectType } from './common';

export function validateObject<T>(schema: T, input: any, name: string): T {

    // Null Validation
    if (schema === null) {
        assert.isNull(input);
        return input;
    }

    // Array Validation
    if (Array.isArray(schema)) {
        assert.isArray(input, name);
        let memIdx = 0;
        for (const member of input) {
            let idx = 0;
            for (const prop of schema) {
                try {
                    input[memIdx] = validate(prop, member, `${name}[${idx++}]`);
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
        assert.isNonNullObject(input, name);
        for (const prop of Object.getOwnPropertyNames(schema)) {
            input[prop] = validate((<any>schema)[prop], input[prop], `${name}.${prop}`);
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
                input = validate(subSchema, input, name);
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
        input = (<any>schema)[sym.CustomValidator](input, name);
    }

    return input;
};
    
    
export function validateString(schema: string, input: any, name: string): string {
    assert.isString(input, name);
    assert.isEqual(schema, input, name);
    return input;
};

export function validateNumber(schema: number, input: any, name: string): number {
    assert.isNumber(input, name);
    assert.isEqual(schema, input, name);
    return input;
};

export function validateBoolean(schema: boolean, input: any, name: string): boolean {
    assert.isBoolean(input, name);
    assert.isEqual(schema, input, name);
    return input;
};

export function validateSymbol(schema: symbol, input: any, name: string): symbol {
    //todo
    return input;
};

export function validateUndefined(schema: undefined, input: any, name: string): undefined {
    assert.isUndefined(input, name);
    return input;
};

export function validateDefault<T>(schema: T, input: any, name: string): T {
    //todo
    return input;
};

export function validate<T>(schema: T, input: any, name: string = 'input'): T {

    // check schema is not null
//    assert.isNonNullObject(input, name);

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