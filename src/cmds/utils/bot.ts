import Discord = require('discord.js');
import BotUtils = require('../../utils/BotUtils');
import os = require('os');

const secondsToDDHHMMSS = (s: number) =>{
    const day = Math.floor(s / (24 * 3600));

    s = s % (24 * 3600);
    const hour = Math.floor(s / 3600);

    s %= 3600;
    const minutes = Math.floor(s / 60);

    s %= 60;
    const seconds = Math.floor(s);

    return `${day}D : ${hour}H : ${minutes}M : ${seconds}S`;
}

exports.exec = async (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> => {
    return new Promise((resolve, reject) =>{
        try{
            const embed = botUtils.constructEmbed();

            embed.setThumbnail(message.client.user.avatarURL());
            embed.setTitle(`About ${message.client.user.username}`);
            embed.addField(`Bot Uptime`, secondsToDDHHMMSS(message.client.uptime / 1000));
            embed.addField(`Host Uptime`, secondsToDDHHMMSS(os.uptime()));
            embed.addField(`Memory`, `${(os.freemem() / Math.pow(10, 9)).toFixed(2)}GBs / ${(os.totalmem() / Math.pow(10, 9)).toFixed(2)}GBs free (${Math.round(100 * (1 - (os.freemem() / os.totalmem())))}% used)`);
            embed.addField(`OS`, `${os.type} ${os.release} ${os.arch}`);
            embed.setDescription(`[Github Repo](https://github.com/obertguo/lcss-covid-bot)`);

            message.channel.send(embed);
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

exports.desc = 'Displays bot information';