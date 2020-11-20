const Ontario = require('../../utils/Ontario');
const London = require('../../utils/London');

const config = require('../../config.json');
const Discord = require('discord.js');

const driver = require('../../utils/driver');
const webdriver = require('selenium-webdriver');
const cheerio = require('cheerio');


exports.run = async (message) =>{

    if(!config.allowedUsers.includes(message.author.id)) return;
    const msg = await message.channel.send('Fetching data...');

    try {
        const ontario = new Ontario(driver(), webdriver, cheerio);
        await ontario.getData();
    
        const london = new London(driver(), webdriver, cheerio);
        await london.getData();
    
        let embed = new Discord.MessageEmbed();

        embed.setColor('#ff7979');

        embed.addField('Ontario', `🚩 Total cases: **${ontario.cases}** \n🔼 Increase from previous report: **${ontario.increase}**`, true);
        embed.addField('London', `🚩 Total cases: **${london.cases}** \n🔼 Increase from previous report: **${london.increase}**`, true);
    
        msg.edit({embed: embed});
    }
    catch(err){
        const errMsg = 'Somthing went wrong or this command is already running' + '```' + err + '...```'.substring(0, 200);
        msg.edit(errMsg);
    }
    
}

exports.desc = 'Fetch Covid Stats';