const h = require("snabbdom/h").default;

import ThreeD from "./three_d";
import TwoD from "./two_d";

const Module = fn => (x, y) => {
  return h('g.module', {attrs: { transform: `translate(${x},${y})` }}, [
    h('rect', {
      attrs: {
        width: 300,
        height: 370,
        fill: 'red'
      }
    }),
    h("foreignObject", {
        attrs: {
          width: 200,
          height: 200
        }
      },
      fn()
    )
  ])

};

module.exports = {
  ThreeD: Module(ThreeD),
  TwoD: Module(TwoD),
};
