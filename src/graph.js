function Graph(isDirected, isWeighted) {
    isDirected = isDirected || false;
    isWeighted = isWeighted || false;
    var counterId = 0,
        keyToIdTable = {},
        links = {};

    this.type = function () {
        return {
            weighted: isWeighted,
            directed: isDirected
        }
    };

    this.addNode = function (key) {
        if (keyToIdTable[key] === undefined) {
            var id = counterId++;
            keyToIdTable[key] = id;
            links[id] = {};
            return true;
        }
        return false;
    };

    this.addLink = function (key1, key2, weight) {
        if (key1 === key2) {
            return false;
        }
        if (this.hasLink(key1, key2)) {
            return false;
        }
        if (!isWeighted || weight === undefined) {
            weight = 1;
        }
        if (isNaN(weight) || typeof(weight) !== "number" || !isFinite(weight)) {
            throw new TypeError("Weight must be a finite number");
        }

        if (!this.hasNode(key1)) {
            this.addNode(key1);
        }
        if (!this.hasNode(key2)) {
            this.addNode(key2);
        }
        var id1 = keyToIdTable[key1],
            id2 = keyToIdTable[key2];
        links[id1][id2] = weight;
        if (!isDirected) {
            links[id2][id1] = weight;
        }
        return true;
    };

    this.hasNode = function (key) {
        return keyToIdTable[key] !== undefined;
    };

    this.hasLink = function (key1, key2) {
        return this.hasNode(key1) && this.hasNode(key2) &&
            links[keyToIdTable[key1]][keyToIdTable[key2]] !== undefined;
    };

    this.removeLink = function(key1, key2) {
        if (!this.hasLink(key1, key2)) {
            return false;
        }
        var id1 = keyToIdTable[key1],
            id2 = keyToIdTable[key2];
        delete links[id1][id2];
        if (!isDirected) {
            delete links[id2][id1];
        }
        return true;
    };

    this.linkWeight = function (key1, key2) {
        if (!this.hasLink(key1, key2)) {
            return undefined;
        }
        else {
            return links[keyToIdTable[key1]][keyToIdTable[key2]];
        }
    }

}

function createGraph(isDirected, isWeighted) {
    return function () {
        return new Graph(isDirected, isWeighted);
    };
}

module.exports = {
    Graph: Graph,
    createGraph: createGraph
};