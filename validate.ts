import * as assert  from './assertions';
import * as sym from './symbols';
import { objectType, isUndefined } from './common';
import { ValidatorError, ValidationError, NotMatchAnyError, ObjectValidationError } from './errors';
import { ValidationOptions } from './validators';
import { INVERT } from './assertions';
import chalk from 'chalk';

/**
 * Validates that the Null, Object or Array value matches the schema.
 * @param schema	Null, Object or Array schema to match. 
 * @param value		Value to be validated.
 * @param property	Name of the property being validated.
 */
export function ValidateObject<T>(schema: T, value: any, property: string): T {

    // Null Validation
    if (schema === null) {
        Null(schema, value, property);
        return value;
    }

    // Array Validation
    if (Array.isArray(schema)) {

        // Ensure that the value is an array.
        try {
            assert.isArray(value);
        } catch (error) {
            throw new ValidatorError(Array.name, property, value, error);
        }

        // Validate each element of the array.
        for (let element_idx = 0; element_idx < value.length; element_idx++) {

			const sub_property = `${property}[${element_idx}]`;
			const match_error = new NotMatchAnyError(value[element_idx]);

			// The element can match Any schema in the array.
            for (let schema_idx = 0; schema_idx < schema.length; schema_idx++) {				

                try {

					value[element_idx] = ValidateRecursive(schema[schema_idx], value[element_idx], sub_property);
					break;

                } catch (error) {

					match_error.child_errors.push(error);

                    if ((schema_idx + 1) === schema.length) {
						throw (match_error.child_errors.length > 1) ? match_error : error;
					}

                }

            }

        }

    // Object Validation
    } else {

		// Ensure that the value is an object.
        try {
            assert.isObject(value);
            assert.isNull(value, INVERT);
            assert.isArray(value, INVERT);
        } catch (error) {
            throw new ValidatorError(Object.name, property, value, error);
        }
        
        const object_error = new ObjectValidationError(value);
		
		// Validate the fields of the object.
        for (const field of Object.getOwnPropertyNames(schema)) {
            try {
                value[field] = ValidateRecursive((<any>schema)[field], value[field], `${property}.${field}`);
            } catch (error) {
                object_error.child_errors.push(error);
            }
        }
        
        if (object_error.child_errors.length > 0) {
            throw object_error;
        }
		
    }

    return value;
};


export function ValidateFunction<T extends () => {}>(schema: T, value: any, property: string): T {

    // Type Validation
    if ((<any>schema)[sym.Validator] === sym.TypeValidator) {
        let type_name = (<any>schema)[sym.TypeValidator];
        try {
            assert.isSameTypeName(type_name, <string>objectType(value));
        } catch(error) {
            throw new ValidatorError(type_name, property, value, error);
        }
    }

    // Options Validation
    else if ((<any>schema)[sym.Validator] === sym.OptionsValidator) {		

        const schemas = (<any>schema)[sym.OptionsValidator].schemas;
        const option: ValidationOptions = (<any>schema)[sym.OptionsValidator].option;
		const option_name = (<any>schema)[sym.Metadata].name;
		
		const match_error = new NotMatchAnyError(value);

		// Check each schema if (ALL); Check first valid schema (ANY).
        for (let schema_idx = 0; schema_idx < schemas.length; schema_idx++) {

            try {
                value = ValidateRecursive(schemas[schema_idx], value, property);
                if (option === ValidationOptions.any)
                    break;
            }
            catch (error) {

				match_error.child_errors.push(error);

                if ((option === ValidationOptions.all) || ((schema_idx + 1) === schemas.length)) {
                    throw new ValidatorError(option_name, property, value, (option === ValidationOptions.all) ? error : match_error);
                }
            }            
        }
    }

    // Validator Validation
    else if ((<any>schema)[sym.Validator] === sym.CustomValidator) {

        let validator_name = (<any>schema)[sym.Metadata].name;
        try {
            value = (<any>schema)[sym.CustomValidator](value, property);
        } catch(error) {
            throw new ValidatorError(validator_name, property, value, error);
		}
		
    }

    return value;
};
    
/**
 * Validates that the value is string literal.
 * @param schema    String literal to match.
 * @param value     Value to be validated.
 * @param property  Name of the property being validated.
 */    
export function LiteralString(schema: string, value: any, property: string): string {
    try {
        assert.isString(value);
        assert.isEqual(schema, value);
    } catch (error) {
        throw new ValidatorError(LiteralString.name, property, value, error);
    }
    return value;
};

/**
 * Validates that the value is number literal.
 * @param schema    Number literal to match.
 * @param value     Value to be validated.
 * @param property  Name of the property being validated.
 */
export function LiteralNumber(schema: number, value: any, property: string): number {
    try {
        assert.isNumber(value);
        assert.isEqual(schema, value);
    } catch (error) {
        throw new ValidatorError(LiteralNumber.name, property, value, error);
    }
    return value;
};

/**
 * Validates that the value is boolean literal.
 * @param schema    Boolean literal to match.
 * @param value     Value to be validated.
 * @param property  Name of the property being validated.
 */
export function LiteralBoolean(schema: boolean, value: any, property: string): boolean {
    try {
        assert.isBoolean(value);
        assert.isEqual(schema, value);
    } catch (error) {
        throw new ValidatorError(LiteralBoolean.name, property, value, error);
    }
    return value;
};

/**
 * Validates that the value is Symbol.
 * @param schema    Symbol schema to match.
 * @param value     Value to be validated.
 * @param property  Name of the property being validated.
 */
export function LiteralSymbol(schema: symbol, value: any, property: string): symbol {
    try {
        assert.isSymbol(value);
        assert.isEqual(schema, value);
    } catch (error) {
        throw new ValidatorError(LiteralSymbol.name, property, value, error);
    }
    return value;
};

/**
 * Validates that the value is undefined.
 * @param schema    Redundant.
 * @param value     Value to be validated.
 * @param property  Name of the property being validated.
 */
export function Undefined(schema: undefined, value: any, property: string): undefined {
    try {
        assert.isUndefined(value);
    } catch (error) {
        throw new ValidatorError(Undefined.name, property, value, error);
    }
    return value;
};

/**
 * Validates that the value is null.
 * @param schema    Redundant.
 * @param value     Value to be validated.
 * @param property  Name of the property being validated.
 */
export function Null(schema: null, value: any, property: string): null {
    try {
        assert.isNull(value);
    } catch (error) {
        throw new ValidatorError(Null.name, property, value, error);
    }
    return value;
};

/**
 * Throws an unknown type validation error.
 * @param schema    Redundant.
 * @param value     Value to be validated.
 * @param property  Name of the property being validated.
 */
export function Unknown<T>(schema: T, value: any, property: string): T {
    throw new ValidatorError(Undefined.name, property, value, new Error('Unable to validate unknown type.'));
};

function ValidateRecursive<T>(schema: T, value: any, property: string): T {
    
    if 		(typeof schema === 'object')	{ value = ValidateObject(schema, value, property); }
    else if	(typeof schema === 'function')	{ value = ValidateFunction(schema, value, property); }        
    else if (typeof schema === 'string')	{ value = LiteralString(schema, value, property); }
    else if (typeof schema === 'number')	{ value = LiteralNumber(schema, value, property); }
    else if (typeof schema === 'boolean')	{ value = LiteralBoolean(schema, value, property); }
    else if (typeof schema === 'symbol')	{ value = LiteralSymbol(schema, value, property); }
    else if (typeof schema === 'undefined')	{ value = Undefined(schema, value, property); }
    else									{ value = Unknown(schema, value, property); }

    return value;
}

export function banner(log: any) {
	log(`\n${chalk.bgRedBright(' '.repeat(31))}\n${chalk.bgRedBright('  ')}${chalk.bold(' Validate TypeScript Error ')}${chalk.bgRedBright('  ')}\n${chalk.bgRedBright(' '.repeat(31))}\n`);
}

export function validate<T>(schema: T, value: any, log: any = console.log, name: string = ''): T {    

    try {
        ValidateRecursive(schema, value, name);    
    } catch(error) {

        if (error instanceof ValidationError) {			

            if (!isUndefined(log)) {
				// banner(log);
				log('');
				log(error.trace);
				log('');
            }

            throw new Error(error.message);

        } else {
            throw error;
        }        
    }   

    return value;
}