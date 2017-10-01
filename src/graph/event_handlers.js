function nodeRan(id) {
  // console.log(`${id} just ran and stored ${JSON.stringify(database[id])}`)
  document.getElementById(id).classList.add("ran");
}

function nodeAdded({ nodeID }) {
  // console.log(`${nodeID} just added to graph`)
}

module.exports = {
  nodeRan,
  nodeAdded
};
