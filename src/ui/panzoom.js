const panZoom = svgPanZoom("svg", {
  zoomEnabled: true,
  panEnabled: false,
  controlIconsEnabled: true,
  fit: true,
  center: true,
  preventMouseEventsDefault: false,
  zoomScaleSensitivity: 0.5,
  maxZoom: 1.5,
  minZoom: 0.05
});

let activeModule = undefined;

document.addEventListener("mouseup", event => {
  activeModule = undefined;
  panZoom.enablePan();
});

function setActiveModule(event) {
  panZoom.disablePan();
  activeModule = event.currentTarget;
}

for (const input of document.querySelectorAll("input")) {
  input.addEventListener("mouseover", panZoom.disablePan);
}

for (const module of document.querySelectorAll("g.module")) {
  module.addEventListener("mousedown", setActiveModule);
}
