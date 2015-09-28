var expect = require("chai").expect;
var graph = require("./index");


describe("Graph", function () {
    var graphs = [
        {
            obj: graph.UndirectedUnweightedGraph,
            name: "Undirected Unweighted Graph", type: {weighted: false, directed: false}
        },
        {
            obj: graph.UndirectedWeightedGraph,
            name: "Undirected Weighted Graph", type: {weighted: true, directed: false}
        },
        {
            obj: graph.DirectedUnweightedGraph,
            name: "Directed Unweighted Graph", type: {weighted: false, directed: true}
        },
        {
            obj: graph.DirectedWeightedGraph,
            name: "Directed Weighted Graph", type: {weighted: true, directed: true}
        }
    ];
    describe("Create and Type", function () {
        graphs.forEach(function (test) {
            it("Create " + test.name, function(){
                var g = test.obj();
                expect(g.type()).to.deep.equal(test.type);
            })
        });
    });

    describe("Add and has node", function(){
        graphs.forEach(function (test) {
            var g = test.obj();
            it("Add node in  " + test.name, function(){
                expect(g.addNode("One", [1])).to.be.true;
                expect(g.addNode("One", [2])).to.be.false;
                expect(g.addNode("Two", [2])).to.be.true;
            });
            it("Has node in  " + test.name, function(){
                expect(g.hasNode("One")).to.be.true;
                expect(g.hasNode("Three")).to.be.false;
                expect(g.hasNode("Two")).to.be.true;
            });
            it("Node value is correct for " + test.name, function(){
                expect(g.nodeValue("One")).to.be.deep.equal([1]);
                expect(g.nodeValue("One")).to.be.not.deep.equal([2]);
                expect(g.nodeValue("Two")).to.be.deep.equal([2]);
                expect(g.nodeValue("Three")).to.be.undefined;
            });
        });
    });
});

