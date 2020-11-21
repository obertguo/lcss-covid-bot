const Discord = require('discord.js');
const stats = require('../../stats.json');

exports.run = async (message) =>{

    let embed = new Discord.MessageEmbed();

    embed.setColor('#ff7979');

    embed.addField('Ontario', `🚩 Total cases: **${stats.ontario.cases}** \n🔼 Increase from previous report: **${stats.ontario.increase}**`, true);
    embed.addField('London', `🚩 Total cases: **${stats.london.cases}** \n🔼 Increase from previous report: **${stats.london.increase}**`, true);
    embed.setFooter('Data retrieved on ' + stats.date);

    message.channel.send({embed: embed});

}

exports.desc = 'Fetch Covid Stats';