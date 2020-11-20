class Utils{
    static parse(str){
        if(typeof parseInt(str) !== 'number'){
            throw new Error('Expected a number');
        }

        else return parseInt(str.split(',').join('')).toLocaleString();
    }
}

module.exports = Utils;