function connectNodes([startX, startY], [endX, endY]) {
  const curve = Math.abs(startX - endX) / 2;
  return [
    ["M"],
    [startX, startY],
    ["C"],
    [startX + curve, startY],
    [endX - curve, endY],
    [endX, endY]
  ]
    .map(x => x.join(","))
    .join(" ");
}

// h("path.edge", {
//   attrs: {
//     d: connect([400,600],[700,500]),
//     stroke: "white",
//     fill: "none",
//     "stroke-width": 4
//   }
// }),

module.exports = {
  connectNodes
};
