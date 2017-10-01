const h = require("snabbdom/h").default;

import ThreeD from "./three_d";
import TwoD from "./two_d";

function Generic(name) {
  return [h("p", name)];
}

function buildInports(name, inports) {
  return inports.map((port, index) => {
    return h("g", [
      h("circle.inport", {
        attrs: {
          cx: 0,
          cy: 30 + 30 * index,
          r: 10,
          id: `${name}>${port}`
        }
      }),
      h(
        "text",
        {
          attrs: {
            x: 0,
            y: 30 + 30 * index
          }
        },
        port
      )
    ]);
  });
}

function buildOutports(name, outports) {
  return outports.map((port, index) => {
    return h("circle.outport", {
      attrs: {
        cx: 200,
        cy: 30 + 30 * index,
        r: 10,
        id: `${name}>${port}`
      }
    });
  });
}

const Module = fn => (x, y, name, inports, outports) => {
  return h(
    "g.module",
    { attrs: { id: name, transform: `translate(${x},${y})` } },
    [
      h("rect", {
        attrs: {
          width: 200,
          height: 100,
          fill: "red"
        }
      }),
      ...buildInports(name, inports),
      ...buildOutports(name, outports),
      h(
        "foreignObject",
        {
          attrs: {
            width: 200,
            height: 100
          }
        },
        fn(name)
      )
    ]
  );
};

module.exports = {
  ThreeD: Module(ThreeD),
  TwoD: Module(TwoD),
  Module,
  Generic
};
