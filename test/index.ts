


import { Email, ID, RegEx, Type, Options, Optional, Nullable, validate } from '../src/index';

console.log("Starting Test");

class Test {
    id: number;
}


const oschema = {
    example_id: ID(),
    string_prop: Type(Number),
    number_prop: Type(Test),
    test: Options([0, Type(Date), "asd", RegEx(/12/), ID()]),
    id_array: [Email(), [Type(Number)], RegEx(/234/)],
    id_object: {
        id3: Options([ID(), Email(), undefined, null, {i: Email(), k: undefined}])
    },
    id_object2: {
        id1: Optional(ID()),
        id2: Nullable(ID()),
    }
};

const schema = {
    id: ID(),
    field_name: Optional({
        name2: false,   
    }),
    tp: Type(Test),
    rx: RegEx(/123/)
}


try {
    const input = validate(schema, {
        id: 1, 
        field_name: {
            name2: false, 
            gender: 'm'
        }, 
        tp: new Test(), 
        rx: '123'
    });
    console.log(input)
} catch (error) {
    console.log(error);
}