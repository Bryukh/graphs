var expect = require("chai").expect;
var graph = require("./index");


describe("Graph:", function () {
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
            it("Create " + test.name, function () {
                var g = test.obj();
                expect(g.type()).to.deep.equal(test.type);
            })
        });
    });

    describe("Add and has node", function () {
        graphs.forEach(function (test) {
            var g = test.obj();
            it("Add node in  " + test.name, function () {
                expect(g.addNode("One")).to.be.true;
                expect(g.addNode("One")).to.be.false;
                expect(g.addNode("Two")).to.be.true;
            });
            it("Has node in  " + test.name, function () {
                expect(g.hasNode("One")).to.be.true;
                expect(g.hasNode("Three")).to.be.false;
                expect(g.hasNode("Two")).to.be.true;
            });
            it("Remove node without links in " + test.name, function () {
                expect(g.removeNode("One")).to.be.true;
                expect(g.hasNode("One")).to.be.false;
                expect(g.hasNode("X")).to.be.false;
                expect(g.addNode("One")).to.be.true;
                expect(g.hasNode("One")).to.be.true;
                expect(g.removeNode("ERR")).to.be.false;
            });
            it("Remove node with links in " + test.name, function () {
                g.addLink("One", "Two");
                g.addLink("One", "Three");
                g.addLink("One", "Four");
                g.removeNode("One");
                expect(g.hasLink("One", "Two")).to.be.false;
            });

        });
    });

    describe("Links:", function () {
        graphs.forEach(function (test) {
            var g = test.obj(),
                gType = test.type;

            g.addNode("One", 1);
            g.addNode("Two", 2);
            g.addNode("Three", 3);
            g.addNode("Five", 5);
            it("Add Link in " + test.name, function () {
                expect(g.addLink("One", "Two")).to.be.true;
                expect(g.addLink("One", "Five")).to.be.true;
                expect(g.addLink("One", "Two")).to.be.false;
                expect(g.addLink("One", "One")).to.be.false;
                // Non existed nodes
                expect(g.addLink("Nine", "Ten")).to.be.true;
                if (gType.weighted) {
                    expect(g.addLink("One", "wThree", 5)).to.be.true;
                    expect(function () {
                        g.addLink("erOne", "erTwo", "5")
                    }).to.throw(TypeError, "Weight must be a finite number");
                    expect(function () {
                        g.addLink("erOne", "erTwo", Infinity)
                    }).to.throw(TypeError, "Weight must be a finite number");
                }
                if (gType.directed) {
                    expect(g.addLink("Two", "One")).to.be.true;
                }
                else {
                    expect(g.addLink("Two", "One")).to.be.false;
                }
            });

            it("Check link weight in " + test.name, function () {
                expect(g.linkWeight("One", "Two")).to.be.equal(1);
                if (gType.directed) {
                    expect(g.linkWeight("Five", "One")).to.be.undefined;
                }
                else {
                    expect(g.linkWeight("Five", "One")).to.be.equal(1);
                }
                expect(g.linkWeight("One", "Two")).to.be.equal(1);
                expect(g.linkWeight("One", "Three")).to.be.undefined;
                if (gType.weighted) {
                    expect(g.linkWeight("One", "wThree")).to.be.equal(5);
                    if (!gType.directed) {
                        expect(g.linkWeight("wThree", "One")).to.be.equal(5);
                    }
                }
            });

            it("Has link in " + test.name, function () {
                expect(g.hasLink("One", "Two")).to.be.true;
                if (gType.directed) {
                    expect(g.hasLink("Five", "One")).to.be.false;
                }
                else {
                    expect(g.hasLink("Five", "One")).to.be.true;
                }
            });


            it("Remove link in " + test.name, function () {
                expect(g.removeLink("One", "Three")).to.be.false;
                expect(g.removeLink("One", "Two")).to.be.true;
                expect(g.hasLink("One", "Two")).to.be.false;
                expect(g.hasNode("One")).to.be.true;
                expect(g.hasNode("Two")).to.be.true;
                if (gType.directed) {
                    expect(g.hasLink("Two", "One")).to.be.true;
                }
                else {
                    expect(g.hasLink("Two", "One")).to.be.false;
                }

            });

        });


    });

    describe("Connections:", function () {
        graphs.forEach(function(test){
            var g = test.obj();
            g.addLink(1, 2);
            g.addLink(1, 3);
            g.addLink(1, 4);
            g.addLink(2, 4);
            g.addLink(4, 6);
            g.addNode(5);
            expect(g.connectedWith(1)).to.include.members([2, 3, 4]);
            expect(g.connectedWith(1)).to.have.length(3);
            expect(g.connectedWith(5)).to.be.deep.equal([]);
            expect(g.connectedWith(7)).to.be.undefined;
            if (test.type.directed) {
                expect(g.connectedWith(4)).to.be.deep.equal([6]);
            }
        });
    })

});

