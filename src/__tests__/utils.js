import Utils from "../utils";

test("greeting", () => {
  const subject = "DAVE";
  const result = "hello DAVE";
  expect(Utils.greeting(subject)).toEqual(result);
});

// _   - null and undefined
// 0-9 - number
// {}  - object
// []  - array
// ""  - string
// fn  - function
// /r/  - regex
// D - date
// E - error

// types

// string
// number
// boolean
// Undefined
// Null
// Symbol
// Proxy
// Object
//   Number
//   String
//   Boolean
//   Function
//   Date
//   Regexp
//   Array
//   Math
//   Error
//     EvalError
//     RangeError
//     ReferenceError
//     SyntaxError
//     TypeError
//     URIError
//   JSON
//   ArrayBuffer
//   DataView
//   Map
//   WeakMap
//   Set
//   WeakSet
//   Promise

describe("typeOf", () => {
  const expectTypeOf = result => input =>
    expect(Utils.typeOf(input)).toEqual(result);

  test("undefined", () => {
    expect(Utils.typeOf()).toEqual("undefined");
    expectTypeOf("undefined")(undefined);
  });

  test("null", () => {
    expectTypeOf("null")(null);
  });

  test("number", () => {
    const expectNumber = expectTypeOf("number");
    expectNumber(10);
    expectNumber(10.2);
    expectNumber(-1);
    expectNumber(NaN);
    expectNumber(Math.PI);
    expectNumber(0b1111);
  });

  test("object", () => {
    const expectObject = expectTypeOf("object");
    expectObject({});
    expectObject({ a: { b: 1 } });
    expectObject(new Object());
  });

  test("array", () => {
    const expectArray = expectTypeOf("array");
    expectArray([]);
    expectArray([[], []]);
    expectArray(new Array());
    expectArray([1, 2, 3, 4]);
  });

  test("string", () => {
    const expectString = expectTypeOf("string");
    expectString("");
    expectString("");
    expectString(new String());
    expectString(`${123}`);
  });

  test("function", () => {
    const expectFunction = expectTypeOf("function");
    expectFunction(new Function());
    expectFunction(function() {});
    expectFunction(() => {});
    expectFunction(() => () => {});
    expectFunction(console.log);
  });

  test("generatorfunction", () => {
    expectTypeOf("generatorfunction")(function*() {});
  });

  test("promise", () => {
    expectTypeOf("promise")(Promise.resolve());
  });

  test("regexp", () => {
    const expectRegexp = expectTypeOf("regexp");
    expectRegexp(/[0-9]/);
    expectRegexp(new RegExp([0 - 9]));
  });

  test("date", () => {
    expectTypeOf("date")(new Date());
  });

  test("error", () => {
    const expectError = expectTypeOf("error");
    expectError(new Error());
    expectError(new ReferenceError());
  });
});
