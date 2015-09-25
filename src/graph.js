function Graph() {
    var counterId = 0;
    var keyToIdTable = {};
    this.nodes = [];
    this.links = {};
}

function emptyGraph() {
    return new Graph();
}

module.exports = {
    emptyGraph: emptyGraph
};