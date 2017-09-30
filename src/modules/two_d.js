const h = require("snabbdom/h").default;

function TwoD() {
  return [
    h("div.preview",
      h("svg", [
        h("circle", { attrs: { cx: 20, cy: 20, fill: 'green', r: 20}})
      ])
    )
  ];
}

module.exports = TwoD;
