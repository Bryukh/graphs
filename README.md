# Graphs

[![Travis build](https://img.shields.io/travis/Bryukh/graphs.svg)](https://travis-ci.org/Bryukh/graphs)
[![Code coverage](https://img.shields.io/codecov/c/github/Bryukh/graphs.svg)](https://codecov.io/github/Bryukh)
[![version](https://img.shields.io/npm/v/graphs-all.svg)](https://www.npmjs.com/package/graphs-all)


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

### Add links

`Graph.addLink(key1, key2)`

`Graph.addLink(key1, key2, weight)`

Add a link between `key1` and `key2` nodes. If nodes are not existed, then they are created.
For directed graphs, it's created a directed link from `key1` to `key2`.
For weighted graphs you can add the third argument `weight` (default == 1).
`weight` must be a number.

```javascript
simpleGraph.addLink("A", "E");
simpleGraph.hasNode("E"); // true
weightedGraph.addLink("E", "C", 5);
```

### Check links

`Graph.hasLink(key1, key2)`

`Graph.linkWeight(key1, key2)`

Check the existence of the link between `key1` and `key2` nodes (the order is important only for directed graphs).
It returns `true` if the link is exist, `false` otherwise.

Also you can use `linkWeight` - it has the same interface and returns `undefined` if the link doesn't exist, 
otherwise the weight of the link (1 for unweighted graphs).

```javascript
simpleGraph.addLink("A", "E");
simpleGraph.hasLink("E", "A"); // true
weightedGraph.addLink("E", "C", 5);
weightedGraph.linkWeight("E", "C"); // 5
simpleGraph.linkWeight("Z", "A"); // undefined
```

### Get node list

`Graph.nodes()`

Returns an array on node keys.

```javascript
simpleGraph.addLink(1, 2);
simpleGraph.addLink(3, 4);
simpleGraph.nodes(); // [1, 2, 3, 4]
```

### Get node connections

`Graph.connectedWith(key)`

Returns an array of keys of nodes, which are connected with the given node.
For directed graphs return only nodes that are available from from the given node.

```javascript
simpleGraph.addLink("A", "D");
simpleGraph.addLink("A", "E");
simpleGraph.addLink("C", "A");
simpleGraph.nodeConnections("A"); // ["E", D", "C"]

directedGraph.addLink("A", "B");
directedGraph.addLink("C", "A");
directedGraph.nodeConnections("A"); // ["B"]
```

### Remove Nodes

`Graph.removeNode(key)`

Removes the node from the graph, also remove all connected links (input and output).

```javascript
directedGraph.addLink("1", "2");
directedGraph.addLink("3", "1");
directedGraph.addLink("1", "4");
directedGraph.removeNode("1");
directedGraph.hasNode("1"); // false
directedGraph.hasLink("1", "2"); // false
directedGraph.hasLink("3", "1"); // false
```

### Remove Links

`Graph.removeLink(key1, key2)`

Removes the link from the graph. The nodes are not removed, only the link.
For directed graphs remove only one-way link from `key1` to `key2`.

```javascript
simpleGraph.addLink("5", "6");
simpleGraph.removeLink("6", "5");
simpleGraph.hasLink("5", "6"); // false
simpleGraph.hasNode("5"); // true
```
