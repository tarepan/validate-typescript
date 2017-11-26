import * as assert  from './assertions';
import * as sym from './symbols';
import { objectType } from './common';
import { ValidatorError, ValidationError, NotMatchAnyError } from './errors';
import { ValidationOptions } from './validators';

export function ValidateObject<T>(schema: T, input: any, name: string): T {

    // Null Validation
    if (schema === null) {
        Null(schema, input, name);
        return input;
    }

    // Array Validation
    if (Array.isArray(schema)) {
        try {
            assert.isArray(input);
        } catch (ex) {
            throw new ValidatorError(Array.name, name, input, ex);
        }
        let memIdx = 0;
        for (const member of input) {
            let idx = 0;
            for (const prop of schema) {
                try {
                    input[memIdx] = ValidateRecursive(prop, member, `${name}[${idx}]`);
                    break;
                } catch (ex) {
                    if ((idx + 1) === schema.length) {
                        throw new ValidatorError(Array.name, `${name}[${idx}]`, input, 
                        new NotMatchAnyError(input[idx]));
                    }
                }
                idx++;
            }
            memIdx++;
        }

    // Object Validation
    } else {
        try {
            assert.isObject(input);
            assert.isNull(input, true);
            assert.isArray(input, true);
        } catch (ex) {
            throw new ValidatorError(Object.name, name, input, ex);
        }
        for (const prop of Object.getOwnPropertyNames(schema)) {
            input[prop] = ValidateRecursive((<any>schema)[prop], input[prop], `${name}.${prop}`);
        }
    }

    return input;
};

export function ValidateFunction<T extends () => {}>(schema: T, input: any, name: string): T {

    // Type Validation
    if ((<any>schema)[sym.Validator] === sym.TypeValidator) {
        let typeName = (<any>schema)[sym.TypeValidator];
        try {
            assert.isSameTypeName(typeName, <string>objectType(input));
        } catch(ex) {
            throw new ValidatorError(typeName, name, input, ex);
        }
    }

    // Options Validation
    else if ((<any>schema)[sym.Validator] === sym.OptionsValidator) {
        let schemas = (<any>schema)[sym.OptionsValidator].schemas;
        let option: ValidationOptions = (<any>schema)[sym.OptionsValidator].option;
        let optionName = (<any>schema)[sym.Metadata].name;
        let idx = 0;
        for (const subSchema of schemas) {
            try {
                idx++;
                input = ValidateRecursive(subSchema, input, name);
                if (option === ValidationOptions.any)
                    break;
            }
            catch (ex) {
                if ((option === ValidationOptions.all) || (idx === schemas.length)) {
                    ex = (option === ValidationOptions.all) ? ex : new NotMatchAnyError(input);
                    throw new ValidatorError(optionName, name, input, ex);
                }
            }            
        }
    }

    // Validator Validation
    else if ((<any>schema)[sym.Validator] === sym.CustomValidator) {
        let validatorName = (<any>schema)[sym.Metadata].name;
        try {
            input = (<any>schema)[sym.CustomValidator](input, name);
        } catch(ex) {
            throw new ValidatorError(validatorName, name, input, ex);
        }
    }

    return input;
};
    
    
export function LiteralString(schema: string, input: any, name: string): string {
    try {
        assert.isString(input);
        assert.isEqual(schema, input);
    } catch (ex) {
        throw new ValidatorError(LiteralString.name, name, input, ex);
    }
    return input;
};

export function LiteralNumber(schema: number, input: any, name: string): number {
    try {
        assert.isNumber(input);
        assert.isEqual(schema, input);
    } catch (ex) {
        throw new ValidatorError(LiteralNumber.name, name, input, ex);
    }
    return input;
};

export function LiteralBoolean(schema: boolean, input: any, name: string): boolean {
    try {
        assert.isBoolean(input);
        assert.isEqual(schema, input);
    } catch (ex) {
        throw new ValidatorError(LiteralBoolean.name, name, input, ex);
    }
    return input;
};

export function LiteralSymbol(schema: symbol, input: any, name: string): symbol {
    try {
        assert.isSymbol(input);
        assert.isEqual(schema, input);
    } catch (ex) {
        throw new ValidatorError(LiteralSymbol.name, name, input, ex);
    }
    return input;
};

export function Undefined(schema: undefined, input: any, name: string): undefined {
    try {
        assert.isUndefined(input);
    } catch (ex) {
        throw new ValidatorError(Undefined.name, name, input, ex);
    }
    return input;
};

export function Null(schema: undefined, input: any, name: string): null {
    try {
        assert.isNull(input);
    } catch (ex) {
        throw new ValidatorError(Null.name, name, input, ex);
    }
    return input;
};

export function Unknown<T>(schema: T, input: any, name: string): T {
    throw new ValidatorError(Undefined.name, name, input, new Error('unknown validation error.'));
};

function ValidateRecursive<T>(schema: T, input: any, name: string): T {

    if (typeof schema === 'object') {
        input = ValidateObject(schema, input, name);
    } else if (typeof schema === 'function') {
        input = ValidateFunction(schema, input, name);
    } else if (typeof schema === 'string') {
        input = LiteralString(schema, input, name);
    } else if (typeof schema === 'number') {
        input = LiteralNumber(schema, input, name);
    } else if (typeof schema === 'boolean') {
        input = LiteralBoolean(schema, input, name);
    } else if (typeof schema === 'symbol') {
        input = LiteralSymbol(schema, input, name);
    } else if (typeof schema === 'undefined') {
        input = Undefined(schema, input, name);
    } else {
        input = Unknown(schema, input, name);
    }

    return input;
}

export function validate<T>(schema: T, input: any, name: string = 'input'): T {

    try {
        ValidateRecursive(schema, input, name);
    } catch(ex) {
        throw new Error(`\n${ex.message}`);        
    }   

    return input;
}