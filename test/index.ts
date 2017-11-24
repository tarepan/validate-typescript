import { Email, ID, RegEx, Type, Options, Optional, Nullable, validate } from '../src/index';

console.log("Starting Test");

class Test {
}
    
const oschema = {
    example_id: ID(),
    string_prop: Type(Boolean),
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
        name2: true,
        gender: Options(['m', 'f', 'o'])
    }),
    tp: Type(Test),
    rx: RegEx(/123/)
}


try {
    const input = validate(schema, {
        id: '2', 
        field_name: {
            name2: true, 
            gender: 'f'
        }, 
        tp: new Test(), 
        rx: '123'
    });
    console.log(input)
} catch (error) {
    console.log(error);
}