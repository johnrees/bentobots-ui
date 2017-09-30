const { ThreeD, TwoD } = require("./modules");
const snabbdom = require("snabbdom");
const patch = snabbdom.init([require("snabbdom/modules/attributes").default]);
const h = require("snabbdom/h").default;

const container = document.getElementById("app");

function connect([startX, startY], [endX, endY], curve=100) {
  return [
    ["M"],
    [startX, startY],
    ["C"],
    [startX+curve, startY],
    [endX-curve, endY],
    [endX, endY]
  ].map(x => x.join(",")).join(" ")
}

const vnode = h("svg", { attrs: { id: "svg" } }, [
  h("path.edge", {
    attrs: {
      d: connect([400,600],[700,500]),
      stroke: "white",
      fill: "none",
      "stroke-width": 4
    }
  }),
  ThreeD(100, 400),
  ThreeD(700, 200),
  TwoD(800, 600),
]);

patch(container, vnode);

const panZoom = svgPanZoom("svg", {
  zoomEnabled: true,
  controlIconsEnabled: true,
  fit: true,
  center: true,
  preventMouseEventsDefault: false,
  zoomScaleSensitivity: 0.5,
  maxZoom: 1.5,
  minZoom: 0.05
  // viewportSelector: document.getElementById('demo-tiger').querySelector('#g4') // this option will make library to misbehave. Viewport should have no transform attribute
});

let activeModule = undefined
var svg = document.querySelector('svg');


const main_group_selector = document.querySelector(".svg-pan-zoom_viewport");

function getSvgPoint(x, y) {
  const point = svg.createSVGPoint();
  point.x = x;
  point.y = y;
  return point.matrixTransform(main_group_selector.getCTM().inverse());
}

function onMouseMove(event) {
  const position = getSvgPoint(event.clientX, event.clientY)
  if (activeModule) {
    activeModule.setAttribute('transform', `translate(${position.x},${position.y})`);
  }

  // console.log(
  //   [...document.querySelectorAll('g.module')].map( g => {
  //     const {e,f} = g.transform.baseVal.consolidate().matrix
  //     return [e,f]
  //   })
  // )
}
svg.addEventListener('mousemove', onMouseMove);

document.addEventListener('mouseup', (event) => {
  activeModule = undefined
  panZoom.enablePan()
});

function setActiveModule(event) {
  panZoom.disablePan()
  activeModule = event.currentTarget;
}

for (const input of document.querySelectorAll('input')) {
  input.addEventListener("mouseover", panZoom.disablePan)
}

for (const module of document.querySelectorAll('g.module')) {
  module.addEventListener("mousedown", setActiveModule)
}

// http://ariutta.github.io/svg-pan-zoom/demo/thumbnailViewer.html
// http://localhost:8080/
// https://ap.www.namecheap.com/domains/domaincontrolpanel/bentobots.com
// http://www.luna-lang.org/
// file:///Users/john/Desktop/8986724/belay-js-example.html
// https://github.com/chrvadala/react-svg-pan-zoom
// https://chrvadala.github.io/react-svg-pan-zoom/?knob-detectAutoPan=true&knob-detectWheel=true&knob-detectPinchGesture=true&knob-preventPanOutside=true&knob-toolbarPosition=right&knob-miniaturePosition=left&knob-miniatureWidth=100&knob-disableDoubleClickZoomWithToolAuto=false&selectedKind=React%20SVG%20Pan%20Zoom&selectedStory=Autosizer%20viewer&full=0&down=1&left=1&panelRight=1&downPanel=storybooks%2Fstorybook-addon-knobs
// https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_resize_height
// https://github.com/johnrees/threejs-starter-project/blob/gh-pages/index.html


// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateMotion
// http://icanbecreative.com/article/animate-element-along-svg-path/
// https://github.com/maxwellito/vivus
// https://css-tricks.com/svg-line-animation-works/
