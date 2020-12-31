class Graph{

    constructor(height, spacing, arr){
        this.height = height;
        this.spacing = spacing;
        this.arr = arr;
    }

    createGraph(){
        let g = new Array(this.height);
        this.width = this.arr.length;

        for(let i = 0; i < this.height; i++){
            g[i] = new Array(this.width);
        }

        this.graph = g;
    }

    //plot an array of values
    plot(){
        const min = getMin(this.arr);
        const max = getMax(this.arr);

        this.graph = fill(this.graph, this.arr, max, min);

        return getText(this.graph, max, min, this.spacing);
    }
}


const getMin = (arr) =>{
    return arr.reduce((min, current) => min < current ? min : current);
}

const getMax = (arr) =>{
    return arr.reduce((max, current) => max > current ? max : current);
}

const fill = (graph, arr, max, min) =>{

    for(let i = 0; i < arr.length; i++){
        const xPos = i;

        //Map value to graph length
        let yPos = Math.floor((arr[i] - min) * (graph.length - 1) / (max - min));

        graph[yPos][xPos] = "#";
    }
    
    return graph;
}

const getText = (graph, max, min, spacing) =>{
    let s = "";

    for(let i = graph.length-1; i >=0 ; i--){
        for(let j = 0; j < graph[i].length; j++){
            s += graph[i][j] == undefined ? " " + spacing : "*" + spacing;
        }
        s += "\n";
    }

    //Stylistic stuff for covid

        s = s.split('\n');
        for(i = 0; i < s.length-1; i++){
            s[i] += ' |';
            s[i] = s[i].split('')
            s[i].shift()
            s[i] = s[i].join('');
        }


        s[0] += " " + max;
        s[s.length-2] += " " + min;
        s = s.join('\n');

    //

    return s;
}

module.exports = Graph;
