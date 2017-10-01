const { ThreeD, TwoD, Module, Generic } = require("./modules");
const snabbdom = require("snabbdom");
const patch = snabbdom.init([require("snabbdom/modules/attributes").default]);
const h = require("snabbdom/h").default;

const { connectNodes } = require("./ui/svg");

const PW = require("patternweb");
const core = require("./nodes/core");
const graph = (window.graph = PW.Graph());
const Β = graph.add;
const database = {};

const container = document.getElementById("app");
const mainGroupSelector = document.querySelector(".svg-pan-zoom_viewport");
let join;
let svg;
let startPoint = undefined;

const { nodeRan, nodeAdded } = require("./graph/event_handlers");

let nodes = [];
let edges = [];

graph.events.on("run", nodeRan);
graph.events.on("add", nodeAdded);

Β("Add", core.math.add, { A: 1, B: 2 });
Β("Sub", core.math.subtract, { A: 10, B: "Add>RESULT" });

console.log(graph.nodes())

nodes = [
  Module(Generic)(20, 20, "Add", ["A", "B"], ["RESULT"]),
  Module(Generic)(400, 20, "Sub", ["A", "B"], ["RESULT"])
];

function render() {
  vnode = patch(vnode, view(data));
}

const view = data => h("svg", { attrs: { id: "svg" } }, data);

let data = [
  ...nodes,
  ...edges,
  h("path.edge", { attrs: { id: "join", d: "" } })
];

let vnode = patch(container, view(data));
console.log(vnode);

svg = document.querySelector("svg");
join = document.getElementById("join");

for (const outport of document.querySelectorAll("circle.outport")) {
  function clickOutport(e) {
    const port = e.currentTarget;
    const { x, y, width, height } = port.getBoundingClientRect();
    startPoint = [x + width / 2, y + height / 2];
  }
  outport.addEventListener("mousedown", clickOutport);
}
const mouseUp = event => {
  startPoint = undefined;
  join.setAttribute("d", "");
};
window.addEventListener("mouseup", mouseUp);

function getSvgPoint(x, y, container) {
  const point = svg.createSVGPoint();
  point.x = x;
  point.y = y;
  return point.matrixTransform(container.getCTM().inverse());
}

function onMouseMove(event) {
  const position = getSvgPoint(event.clientX, event.clientY, svg);
  if (startPoint) {
    const endPoint = [position.x, position.y];
    join.setAttribute("d", connectNodes(startPoint, endPoint));
  }
  // if (activeModule) {
  //   activeModule.setAttribute('transform', `translate(${position.x},${position.y})`);
  // }
}
svg.addEventListener("mousemove", onMouseMove);

graph.run(database, function() {
  console.log(database); // { Add: { RESULT: 3 }, Sum: { RESULT: 7 } }
});

// require("./ui/panzoom");
