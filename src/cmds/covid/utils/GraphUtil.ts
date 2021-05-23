class Graph{
    //graph settings
    private graphHeight: number;
    private values: Array<number>;
    private spacing: number;

    //stores graph as an array
    private graph: Array<Array<string>>;

    //stores remaped values of value array within graph height range
    private remappedValues: Array<number>;

    public constructor(graphHeight: number, spacing: number, values: Array<number>){
        this.graphHeight = graphHeight;
        this.values = values;
        this.spacing = spacing;

        //Initialize arrays
        this.graph = new Array();
        this.remappedValues = new Array();

        //Initialize 2D graph array
        for(let rows = 0; rows < this.graphHeight; ++rows){
            this.graph[rows] = new Array();

            for(let cols = 0; cols < this.values.length; ++cols){
                this.graph[rows][cols] = ' ';
            }
        }
    }

    public generateGraph(): string {
        const minVal = this.values.reduce((min, current) => min < current ? min : current);
        const maxVal = this.values.reduce((max, current) => max > current ? max : current);
        let graphStringResult = '';

        //old range is the min val and max val in values array 
        //new range is the height of the graph from 0 to height
    
        //remap values and store in remappedValues array
        for(let i = 0; i < this.values.length; ++i){
            //remapped values are based on zero index (for easy array manipulation), thus height is subtracted by 1
            this.remappedValues[i] = this.remapValues(minVal, maxVal, 0, this.graphHeight - 1, this.values[i]);
        }
        //plot pts
        for(let col = 0; col < this.remappedValues.length; ++col){
            //floor to nearest int
            const row = Math.floor(this.remappedValues[col]);

            //If there is a zero value, don't plot
            if(row !== 0) this.graph[row][col] = '*';
        }

        //print graph - the displayed graph array is vertically flipped, thus rows are printed from end to start
        for(let row = this.graphHeight - 1; row >= 0 ; --row){
            //concatenate result as each row is iterated. Also apply spacing and append pipe at the end
            graphStringResult += this.graph[row].join(' '.repeat(this.spacing)) + '|';

            //print min/max values on the side of the graph
            if(row === this.graphHeight - 1) graphStringResult += maxVal;
            if(row === 0) graphStringResult += minVal;

            //Append newline for next row
            graphStringResult += '\n';
        }
        return graphStringResult;
    }

    private remapValues(oldMin: number, oldMax: number, newMin: number, newMax: number, num: number): number{
        const oldRange = oldMax - oldMin;
        const newRange = newMax - newMin;

        const rangeScaleFactor = newRange / oldRange;
        const offsetToZero = num - oldMin;

        return (rangeScaleFactor * offsetToZero) + newMin;
    }
}

export = Graph;