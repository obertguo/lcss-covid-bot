const math = require('mathjs');

exports.run = (message, args, client) =>{
    const promise = Promise;
    const settimeout = setTimeout;
    const object = Object;
    const embed = require('discord.js').MessageEmbed;
    const date = Date;

    if(message.author.id !== '226457061959925761') return;

    const clean = text => {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else 
            return text;
    }

    try {
        args.shift();

        const code = args.join(' ');
        let evaled = eval(code);
    
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
        
        if(clean(evaled).length > 1000) {
            console.log(clean(evaled));
            message.channel.send('The message exceeded the text limit. Results are sent to console');
        }  
        else {
            message.channel.send(clean(evaled), {code:"js"});
        }

    } catch (err) {
        message.channel.send(`:warning: __**\`Eval Command Execution Failed.\`**__\`\`\`js\n${clean(err)}\n\`\`\``);
    }
    
}
exports.desc = "Evaluate javascript code";