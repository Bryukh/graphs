# Graphs

This library contain an implementation of graph data structure
with various method that can be useful in operations by graphs.

Graphs can directed and undirected, weighted and unweighted. 
So we have 4 variations and this library can works with them. 

## Install

```
npm install graphs-all
```

## Getting Started

Import the library

```javascript
var graphs = require("graphs-all");
var g = graphs.UndirectedUnweightedGraph();
g.addNode("A");
g.addLink("A", "B");
g.addLink("A", "C");
g.addLink("B", "C");
g.hasNode("C") // true
g.hasLink("B", "A") // true
g.removeLink("C", "A");
g.connectedWith("B") // ["A", "B"]
```

### Create a graph

You can create four variations of graphs with shortcuts functions:

```javascript
var simpleGraph = graphs.UndirectedUnweightedGraph(), 
    directedGraph = graphs.DirectedUnweightedGraph(),
    weightedGraph = graph.UndirectedWeightedGraph(),
    complexGraph = graph.DirectedWeightedGraph();
```

Or with `Graph` class:
 
`new Graph(isDirected, isWeighted)`

```javascript
var simpleGraph = new graphs.Graph(false, false), 
    directedGraph = new graphs.Graph(true, false),
    weightedGraph = new graphs.Graph(false, true),
    complexGraph = new graphs.Graph(true, true);
```

### Add nodes

`Graph.addNode(nodeKey)`

Add a node in the graph with key `nodeKey`. If node is exist already,
then return `false`, for successive addition returns `true`.

```javascript
simpleGraph.addNode("A")
simpleGraph.hasNode("B") // true
simpleGraph.hasNode("A") // false
```

### Check nodes

`Graph.hasNode(nodeKey)`

Check is a node with key `nodekey` in the graph

```javascript
simpleGraph.hasNode("A") // true
simpleGraph.hasNode("E") // false
```

#TODO
