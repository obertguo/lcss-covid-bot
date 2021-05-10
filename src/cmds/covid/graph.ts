import Discord = require('discord.js');
import Graph = require('./utils/GraphUtil');
import getCovidDataPromise = require('./utils/GetCovidData');
import BotUtils = require('../../utils/BotUtils');

exports.exec = (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> =>{
    return new Promise(async(resolve, reject) =>{
        try{
            //arg checks
            if(!Number.parseInt(args[1])) return message.channel.send('Days must be between 1 and 50');
            const days = Number.parseInt(args[1]);
            if(days < 0 || days > 50) return message.channel.send('Days must be between 1 and 50');

            //fetch data
            let res = await getCovidDataPromise(days);

            //array of daily increases from earliest to latest
            let arr: Array<number> = res.map(record => record.dailyIncrease);
            //append 0 as to make it the lowest value so that graph can be scaled accordingly
            arr.unshift(0);

            //create graph
            const height = 15;
            let spacing = 0;
            if(days <= 15) spacing = 2;
            if(days >= 16 && days <=25) spacing = 1;
            const graph = new Graph(height, spacing, arr);
            
            const embed = botUtils.constructEmbed();
            embed.setTitle(`Graphical Representation of Ontario's Cases the past ${days} Days`);
            embed.setDescription("```" + graph.generateGraph() + "```");
            embed.setColor('#ff7979');
            embed.setFooter("NOTE - there may be days where information was not available, and as such, weren't plotted on the graph");

            message.channel.send(embed);  
            resolve();
        }
        catch(err){
            reject(err);
        }
    });    
}

exports.desc = 'Get a graphical representation of Ontario\'s cases';