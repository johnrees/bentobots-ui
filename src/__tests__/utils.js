import Utils from "../utils";

test("greeting", () => {
  const subject = "DAVE";
  const result = "hello DAVE";
  expect(Utils.greeting(subject)).toEqual(result);
});
