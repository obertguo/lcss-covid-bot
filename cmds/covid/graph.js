const Discord = require('discord.js');
const Graph = require('./Graph/Graph');
const getDataPromise = require('./Graph/GetData');

exports.run = async (message, args) =>{
    
    if(!Number.parseInt(args[1])) return message.channel.send('Days must be between 1 and 50');

    const days = Number.parseInt(args[1]);
    
    if(days < 0 || days > 50) return message.channel.send('Days must be between 1 and 50');

    getDataPromise(days).then(res =>{
        let arr = [];
        for(i = 0; i < res.length; i++){
            arr.push(res[i].total);
        }
        arr.unshift(0);

        let spacing = "";
        if(days <= 15) spacing = "  ";
        if(days >= 16 && days <=25) spacing = " ";

        let g = new Graph(12, spacing, arr);
        g.createGraph();

        const embed = new Discord.MessageEmbed();
        embed.setTitle(`Graphical Representation of Ontario's Cases the past ${days} Days`);
        embed.setDescription("```" + g.plot() + "```");
        embed.setColor('#ff7979');
        embed.setFooter("NOTE - if you do see a marker placed at 0, it means the data could not be found for that day...Unless if COVID is somehow eradicated ");

        message.channel.send(embed);  
        // message.channel.send("```" + g.plot() + "```")
    }).catch(err =>{
        console.log(err);
        message.channel.send('Failed to fetch data... Ping Kai to fix or something pls');
    }); 
}

exports.desc = 'Get a graphical representation of Ontario\'s cases the past 14 days';