function Node(key, value) {
    this.key = key;
    this.value = value;
}

function Graph(isDirected, isWeighted) {
    isDirected = isDirected || false;
    isWeighted = isWeighted || false;
    var counterId = 0,
        keyToIdTable = {};
    this.nodes = {};
    this.links = {};

    this.type = function() {
        return {
            weighted: isWeighted,
            directed: isDirected
        }
    };

    this.addNode = function(key, value) {
        if (keyToIdTable[key] === undefined) {
            var id = counterId++;
            keyToIdTable[key] = id;
            this.nodes[id] = value;
            this.links[id] = {};
            return true;
        }
        return false;
    };

    this.addLink = function(key1, key2, weight) {
        if (!isWeighted || weight === undefined) {
            weight = 1;
        }
        if (isNaN(weight)) {
            throw "Weight must be a number";
        }
        var id1 = keyToIdTable[key1],
            id2 = keyToIdTable[key2];
        if (id1 === undefined) {
            throw "'" + key1 + "' is not found."
        }
        if (id2 === undefined) {
            throw "'" + key2 + "' is not found."
        }
        this.links[id1][id2] = weight;
        if (!isDirected) {
            this.links[id2][id1] = weight;
        }
    };

    this.hasNode = function(key) {
        return keyToIdTable[key] !== undefined;
    };

    this.nodeValue = function(key) {
        if (!this.hasNode(key)) {
            return undefined;
        }
        else {
            return this.nodes[keyToIdTable[key]];
        }
    };

    this.hasLink = function(key1, key2) {
        return this.hasNode(key1) && this.hasNode(key2) && this.links[key1][key2] !== undefined;
    };

    this.linkWeight = function(key1, key2) {
        if (!this.hasLink(key1, key2)) {
            return undefined;
        }
        else {
            return this.links[keyToIdTable[key1]][keyToIdTable[key2]];
        }
    }


}

function createGraph(isDirected, isWeighted) {
    return function(){
        return new Graph(isDirected, isWeighted);
    };
}

module.exports = {
    Graph: Graph,
    createGraph: createGraph
};