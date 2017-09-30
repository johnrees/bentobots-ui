const h = require("snabbdom/h").default;

function ThreeD() {
  return [
    h("p", "hello world"),
    h("input", { attrs: { type: "range", min: 0, max: 100 } }),
    h("input", { attrs: { type: "text" } }),
    h("div.preview")
  ];
}

module.exports = ThreeD;
