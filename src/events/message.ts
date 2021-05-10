import Discord = require('discord.js');
import BotUtils = require('../utils/BotUtils');
import utils = require('../utils/GeneralUtils');
import util = require('util');

const messageEventHandler = async (botUtils: BotUtils, message: Discord.Message): Promise<void> =>{
    if(message.author.bot || !message.content.toLowerCase().startsWith(botUtils.getBotConfig().prefix)) return;

    const args = message.content.toLowerCase().split(botUtils.getBotConfig().prefix)[1].split(' ').filter(v => v!== '');
    const cmd = args[0];

    if(!botUtils.getCommandsMap().has(cmd)) return;

    try{
        await botUtils.getCommandsMap().get(cmd).exec(message, args, botUtils);
    }
    catch(err){
        let chan = <Discord.TextChannel>message.channel;
        message.channel.send(`❌ Command execution failed. You can report this to Kai#6119`).catch(errr => utils.logError(`ERR:\n${errr}`));
        if(util.inspect(err).length < 1900) message.channel.send('Reason for error:\n```js\n' + util.inspect(err) + '```').catch(errr => utils.logError(`ERR:\n${errr}`));
        
        utils.logError(`Command execution failed.\nCOMMAND: ${message.content}\nERR: ${err}\nTIME: ${new Date(Date.now())}\nGUILD: ${message.guild.name} | ${message.guild.id}\nCHANNEL: ${chan.name} | ${chan.id}\nUSER: ${message.author.username} | ${message.author.id}`);
    }
}

export = messageEventHandler;
