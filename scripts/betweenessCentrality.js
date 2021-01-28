const betweenessCentrality = require('../data/betweenessCentrality.json').betweenness_centrality
const defaultThreshold = 0.80
const thresold = process.argv[2] ?? defaultThreshold
let totalNumberOfNodes = 0
nodesOfInterest = {}


for (index in betweenessCentrality) {
    totalNumberOfNodes++

    if (betweenessCentrality[index].normalized_value >= thresold) {
        nodesOfInterest[index] = betweenessCentrality[index].normalized_value
    }
}

console.table(nodesOfInterest)

