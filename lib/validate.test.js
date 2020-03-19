"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_1 = require("./validate");
var index_1 = require("./index");
var schema = {
    a: index_1.Primitive(Number)
};
var validInput = {
    a: 1
};
var invalidInput = {
    a: "1"
};
describe("validate", function () {
    it("should pass valid object", function () {
        expect(validate_1.validate(schema, validInput)).toBe(validInput);
    });
    it("should reject invalid object", function () {
        expect(function () { return validate_1.validate(schema, invalidInput); }).toThrow();
    });
});
//# sourceMappingURL=validate.test.js.map