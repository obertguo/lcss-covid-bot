const evalWithContext = (code) =>{
    const { chain, derivative, e, evaluate, log, pi, pow, round, sqrt, sin, cos, tan, csc, sec, cot, cross, dot, unit, simplify, rationalize } = require('mathjs');
    return eval(code);
}

exports.run = (message, args, client) =>{
    // if(message.author.id !== '226457061959925761') return;

    const clean = text => {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else 
            return text;
    }


    try {
        args.shift();

        const code = args.join(' ');

        let evaled = evalWithContext(code);
    
        if (typeof evaled !== "string") {
            //evaled = require("util").inspect(evaled);
            evaled = String(evaled);
        }
        

        message.channel.send(clean(evaled), {code:"js"});

    } catch (err) {
        message.channel.send(`:warning: __**\`Math Command Execution Failed.\`**__\`\`\`js\n${clean(err)}\n\`\`\``);
    }
    
}


exports.desc = "Evaluate some math stuff - https://mathjs.org/docs/index.html";