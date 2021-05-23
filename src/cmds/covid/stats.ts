import Discord = require('discord.js');
import BotUtils = require('../../utils/BotUtils');
import Utils = require('../../utils/GeneralUtils');
import Types = require('../../types');

exports.exec = (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try {
            const stats: Types.ICovidStats = JSON.parse(await Utils.readFile('./covidstats.json'));
    
            let embed = botUtils.constructEmbed();
    
            embed.addField('Ontario', 
            `🚩 Total cases: **${stats.ontario.totalCases.toLocaleString()}** \n🔼 Increase from previous report: **${stats.ontario.dailyIncrease.toLocaleString()}**`, true);
    
            embed.addField('London', 
            `🚩 Total cases: **${stats.london.totalCases.toLocaleString()}** \n🔼 Increase from previous report: **${stats.london.dailyIncrease.toLocaleString()}**`, true);
    
            embed.setFooter('Data retrieved on ' + new Date(stats.retrievedTimestamp));
    
            message.channel.send({embed: embed});
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

exports.desc = 'Fetches covid stats';