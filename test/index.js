"use strict";
exports.__esModule = true;
var index_1 = require("../src/index");
console.log("Starting Test");
var Test = /** @class */ (function () {
    function Test() {
    }
    return Test;
}());
var oschema = {
    example_id: index_1.ID(),
    string_prop: index_1.Type(Boolean),
    number_prop: index_1.Type(Test),
    test: index_1.Options([0, index_1.Type(Date), "asd", index_1.RegEx(/12/), index_1.ID()]),
    id_array: [index_1.Email(), [index_1.Type(Number)], index_1.RegEx(/234/)],
    id_object: {
        id3: index_1.Options([index_1.ID(), index_1.Email(), undefined, null, { i: index_1.Email(), k: undefined }])
    },
    id_object2: {
        id1: index_1.Optional(index_1.ID()),
        id2: index_1.Nullable(index_1.ID())
    }
};
var schema = {
    id: index_1.ID(),
    field_name: index_1.Optional({
        name2: true,
        gender: index_1.Options(['m', 'f', 'o'])
    }),
    tp: index_1.Type(Test),
    rx: index_1.RegEx(/123/)
};
try {
    var input = index_1.validate(schema, {
        id: '2',
        field_name: {
            name2: true,
            gender: 'f'
        },
        tp: new Test(),
        rx: '123'
    });
    console.log(input);
}
catch (error) {
    console.log(error);
}
