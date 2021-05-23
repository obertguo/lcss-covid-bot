import BotUtils = require('../utils/BotUtils');
import utils = require('../utils/GeneralUtils');
import Types = require('../types');
import Discord = require('discord.js');

const readyEventHandler = (botUtils: BotUtils, covidStats?: Types.ICovidStats):void =>{
    utils.logInfo(`Logged in as ${botUtils.getClient().user.username}`);
    botUtils.getClient().guilds.cache.map(g => g.me.setNickname(''));

    if(covidStats){
        try{
            const ontarioChan: Discord.TextChannel = <Discord.TextChannel>botUtils.getClient().channels.cache.get(botUtils.getDiscordServerConfig().covid.dailyIncrease.channels.ontario);
            const londonChan: Discord.TextChannel = <Discord.TextChannel>botUtils.getClient().channels.cache.get(botUtils.getDiscordServerConfig().covid.dailyIncrease.channels.london);

            ontarioChan.setName(`${botUtils.getDiscordServerConfig().covid.dailyIncrease.appendedTextDescription.ontario} ${covidStats.ontario.dailyIncrease.toLocaleString()}`);
            londonChan.setName(`${botUtils.getDiscordServerConfig().covid.dailyIncrease.appendedTextDescription.london} ${covidStats.london.dailyIncrease.toLocaleString()}`);

            utils.logInfo(`Updated covid stats in ${botUtils.getClient().guilds.cache.get(botUtils.getDiscordServerConfig().serverID).name}`);
        }
        catch(err){
            console.error(err);
        }
    }
}

export = readyEventHandler;