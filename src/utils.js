const greeting = name => `hello ${name}`;

const typeOf = obj =>
  ({}.toString
    .call(obj)
    .split(" ")[1]
    .slice(0, -1)
    .toLowerCase());

module.exports = {
  greeting,
  typeOf
};
