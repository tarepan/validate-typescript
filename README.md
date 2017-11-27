# validate-typescript
Extensible schema based validator that supports typescript typing.

This package strives meet the following criteria:

- [lightweight](#example)
- [inline](#example)
- [simple](#example)
- [strongly typed](#validators)
- [extensible](#custom-validators)
- [convertable](#converters)

# Installation

    > npm install validate-typescript

# Imports

```ts
import { ... } from 'validate-typescript';
import { ... } from 'validate-typescript/validators';
import { ... } from 'validate-typescript/extensions';
import { ... } from 'validate-typescript/assertions';
import { ... } from 'validate-typescript/conversions';
import { ... } from 'validate-typescript/errors';
```

# Getting Started

The example below represents a basic subset of the inline validations that can be applied.

## Example

```ts
import { Email, ID, RegEx, Type, Options, Optional, Nullable, Alias, Any, All, validate } from 'validate-typescript';

function ZaPhoneNumber() {
    return Alias(RegEx(/^((\+27|0)\d{9})$/), ZaPhoneNumber.name);
}

class CustomMessage {
    constructor(public message: string) {}
}

const schema = {
    id: ID(),
    children: [ID()],
    username: Type(String),
    email: Email(),
    gmail: RegEx(/.+@gmail.com/),
    phone: ZaPhoneNumber(),
    gender: Options(['m', 'f', 'o']),
    married: Type(Boolean),
    names: {
        first: Type(String),
        middle: Optional(Type(String)),
        last: Type(String)
    }
    message: Type(CustomMessage)
}

const input = {
    id: 17,
    children: [1,2,'3'],
    username: 'solomon',
    email: 'solomon@validate-typescript.com',
    gmail: 'solomon@gmail.com',
    phone: '+27824392186'
    gender: 'm',
    married: true,
    names: {
        first: 'Solomon',
        last: 'Dube',
    }
    message: new CustomMessage('Sawubona Mhlaba')
}

try {
    const input = validate(schema, input);
    console.log(input); // no validation error
} catch (error) {
    console.log(error); // validation error
}
```

# Validators

The following examples of `validate-typescript` schemas illustrate the different validation methods.

**Note:** the comment `// type: TypeName` following the validator explicitly specifies the resultant typescript type inferred by the typescipt transpiler. This relates back to the *strongly typed* criteria.

## Type Validators

Expects an exact type match.

```ts
let schema = {
    myNumber: Type(Number),      // type: Number
    myString: Type(String),      // type: String
    myCustom: Type(CustomClass), // type: CustomClass
    // etc...
}
```

## Literal Validators

Expects an exact type and value match.

```ts
let schema = {
    number49:    49,              // type: number
    myCountry:   'South Africa',  // type: string
    dontDefine:  undefined,       // type: undefined
    allwaysNull: null,            // type: null
    // etc...
}
```

## Custom (Extension) Validators

Expects custom convertions and assertions to be valid.

```ts
let schema = {
    myEmail:  Email(),      // type: string
    sqlId:    ID(),         // type: number
    comeText: RegEx(/abc/), // type: string
    // etc...
}
```

## Nested Object Validators

Expects a nested object that matches the nested schema.

```ts
let schema = {
    subObject: {
        a: ID(),
        b: Type(Date)
        c: {
            d: RegEx(/.+@gmail.com/)
        }
    } // type: { a: number, b: Date, c: { d: string } }
}
```

## Array Validators

Expects an array that matches the contents of the array schema.

**Note:** Multiple validators in the array are treated as boolean-or ([any](#any-or-all-validators)).

```ts
let schema = {
    // array validation
    emailArray: [Email()]             // type: string[]
    idArray: [ID()]                   // type: number[]

    // array with multiple options validation
    arrayOfEmailOrId: [Email(), ID()] // type: (string | number)[]
}
```

## Options Validators

Expects [any](#any-or-all-validators) or [all](#any-or-all-validators) of the validation options to match.

```ts
let schema = {
    // options validation
    options: Options([Type(Number), Type(String)]) // type: number | string

    // optional validation (i.e. not required)
    optional: Optional(ID())                       // type: number | undefined
    alsoOptional: Options([ID(), undefined])       // type: number | undefined

    // nullable validation
    maybeNull: Nullable(Type(String)),             // type: String | null
    alsoMaybeNull: Options([Type(String, null)]),  // type: String | null

    // array options
    arrayOptions: Options([[Email()], [ID()]])     // type: string[] | number[]
}
```

## Any or All Validators

Any represents boolean-or of the validation options while all represents boolean-and.

```ts
let schema = {

    // validate any options
    anyOptions: Options([Type(Number), Type(String)], ValidationOptions.any)     // type: number | string
    alsoAny: Any([Type(Number), Type(String)])                                   // type: number | string

    // validate all options
    allOptions: Options([RegEx(/.+@gmail.com/), Email()], ValidationOptions.all) // type: number | string
    alsoAll: All([RegEx(/.+@gmail.com/), Email()])                               // type: number | string
}
```
## Validation

```
try {
    const input = validate(schema, input);
    console.log(input); // no validation error
} catch (error) {
    console.log(error); // validation error
}
```

TODO: complete

## Assertions

TODO: complete

## Converters

TODO: complete

## Errors

Custom validation errors are implemented. It is ulikely that you will need to extend these but there may be future extensions.

For example, supporting JSON formatted validation errors for easier parsing and logging.

## Custom Validators (Extensions)

Validators can be customized using converters, assertions as well as other custom validators (extensions).

### Alias

Aliasing is a method of aliasing a custom validator, possibly with inputs.

```ts
import { RegEx, Alias } from 'validate-typescript';

export function ZaPhoneNumber() {
    return Alias(RegEx(/^((\+27|0)\d{9})$/), ZaPhoneNumber.name);
}
```

### ID

This example illustrates the use of both a converter and an assertion.

```ts
import { Validator } from 'validate-typescript';
import * as convert from 'validate-typescript/conversions';

export function ID() {
    return Validator((input: any): number => {
        const value = convert.toInt(input);
        assert.isGreaterThan(0, value);
        return value;
    }, ID.name);
}
```

### RegEx

This example illustrates only the use of assertions.

```ts
import { Validator } from 'validate-typescript';
import * as assert from 'validate-typescript/assertions';

export function RegEx(regEx: RegExp) {
    return Validator((input: any): string => {
        assert.isString(input);
        assert.isRegEx(regEx, input);
        return input;
    }, RegEx.name);
}
```

## Recommendations

TODO: complete
