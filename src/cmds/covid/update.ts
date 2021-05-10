import Discord = require('discord.js');
import BotUtils = require('../../utils/BotUtils');
import Types = require('../../types');
let stats: Types.ICovidStats = require('../../covidstats.json');
import getCovidStats = require('../../utils/covid/getCovidStats');
import Utils = require('../../utils/GeneralUtils');

exports.exec = (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            if(!botUtils.getDiscordServerConfig().execUsers.includes(message.author.id)) return message.channel.send(botUtils.constructEmbed().setDescription(`**[Nice try. Click here for a 🍪](https://www.youtube.com/watch?v=xvFZjo5PgG0)**`));

            const dateToday: Date = new Date(Date.now());
            const dateDataRetrieved: Date = new Date(stats.retrievedTimestamp);

            const msg = await message.channel.send(`Updating stats...`);

            //if date the data is retrieved is not the same day as today, update data
            if(dateToday.getDate() !== dateDataRetrieved.getDate()) stats = await getCovidStats();
            
            const ontarioChan: Discord.TextChannel = <Discord.TextChannel>botUtils.getClient().channels.cache.get(botUtils.getDiscordServerConfig().covid.dailyIncrease.channels.ontario);
            const londonChan: Discord.TextChannel = <Discord.TextChannel>botUtils.getClient().channels.cache.get(botUtils.getDiscordServerConfig().covid.dailyIncrease.channels.london);

            ontarioChan.setName(`${botUtils.getDiscordServerConfig().covid.dailyIncrease.appendedTextDescription.ontario} ${stats.ontario.dailyIncrease.toLocaleString()}`);
            londonChan.setName(`${botUtils.getDiscordServerConfig().covid.dailyIncrease.appendedTextDescription.london} ${stats.london.dailyIncrease.toLocaleString()}`);

            msg.edit(`Updated covid stats in ${botUtils.getClient().guilds.cache.get(botUtils.getDiscordServerConfig().serverID).name}`);
            resolve();
        }   
        catch(err){
            reject(err);
        }
    });
}

exports.desc = 'Updates covid stats';