const add = {
  name: "add",
  description: "adds values",
  fn: ({ A, B }, done) => done({ RESULT: A + B }),
  inports: ["A", "B"],
  outports: ["RESULT"]
};

const subtract = {
  name: "subtract",
  description: "subtracts values",
  fn: ({ A, B }, done) => done({ RESULT: A - B }),
  inports: ["A", "B"],
  outports: ["RESULT"]
};

module.exports = {
  math: {
    add,
    subtract
  }
};
