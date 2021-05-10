"use strict";
var Graph = /** @class */ (function () {
    function Graph(graphHeight, spacing, values) {
        this.graphHeight = graphHeight;
        this.values = values;
        this.spacing = spacing;
        //Initialize arrays
        this.graph = new Array();
        this.remappedValues = new Array();
        //Initialize 2D graph array
        for (var rows = 0; rows < this.graphHeight; ++rows) {
            this.graph[rows] = new Array();
            for (var cols = 0; cols < this.values.length; ++cols) {
                this.graph[rows][cols] = ' ';
            }
        }
    }
    Graph.prototype.generateGraph = function () {
        var minVal = this.values.reduce(function (min, current) { return min < current ? min : current; });
        var maxVal = this.values.reduce(function (max, current) { return max > current ? max : current; });
        var graphStringResult = '';
        //old range is the min val and max val in values array 
        //new range is the height of the graph from 0 to height
        //remap values and store in remappedValues array
        for (var i = 0; i < this.values.length; ++i) {
            //remapped values are based on zero index (for easy array manipulation), thus height is subtracted by 1
            this.remappedValues[i] = this.remapValues(minVal, maxVal, 0, this.graphHeight - 1, this.values[i]);
        }
        //plot pts
        for (var col = 0; col < this.remappedValues.length; ++col) {
            //floor to nearest int
            var row = Math.floor(this.remappedValues[col]);
            //If there is a zero value, don't plot
            if (row !== 0)
                this.graph[row][col] = '*';
        }
        //print graph - the displayed graph array is vertically flipped, thus rows are printed from end to start
        for (var row = this.graphHeight - 1; row >= 0; --row) {
            //concatenate result as each row is iterated. Also apply spacing and append pipe at the end
            graphStringResult += this.graph[row].join(' '.repeat(this.spacing)) + '|';
            //print min/max values on the side of the graph
            if (row === this.graphHeight - 1)
                graphStringResult += maxVal;
            if (row === 0)
                graphStringResult += minVal;
            //Append newline for next row
            graphStringResult += '\n';
        }
        return graphStringResult;
    };
    Graph.prototype.remapValues = function (oldMin, oldMax, newMin, newMax, num) {
        var oldRange = oldMax - oldMin;
        var newRange = newMax - newMin;
        var rangeScaleFactor = newRange / oldRange;
        var offsetToZero = num - oldMin;
        return (rangeScaleFactor * offsetToZero) + newMin;
    };
    return Graph;
}());
module.exports = Graph;
