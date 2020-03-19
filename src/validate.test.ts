import { validate } from "./validate";
import { Primitive } from "./index";

const schema = {
  a: Primitive(Number)
};
const validInput = {
  a: 1
};
const invalidInput = {
  a: "1"
};

describe("validate", () => {
  it("should pass valid object", () => {
    expect(validate(schema, validInput)).toBe(validInput);
  });
  it("should reject invalid object", () => {
    expect(() => validate(schema, invalidInput)).toThrow();
  });
});
