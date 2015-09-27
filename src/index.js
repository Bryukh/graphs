"use strict";

var graph = require("./graph.js");

module.exports = {
    UndirectedUnweightedGraph: graph.createGraph(false, false),
    DirectedUnweightedGraph: graph.createGraph(true, false),
    DirectedWeightedGraph: graph.createGraph(true, true),
    UndirectedWeightedGraph: graph.createGraph(false, true)
};