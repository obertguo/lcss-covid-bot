import Discord = require('discord.js');
import Types = require('../types');
import BotUtils = require('../utils/BotUtils');
import utils = require('../utils/GeneralUtils');
import messageEventHandler = require('./message');
import readyEventHandler = require('./ready');
import guildMemberAdd = require('./guildMemberAdd');
import Utils = require('../utils/GeneralUtils');

const eventLoader = (botUtils: BotUtils, covidStats?: Types.ICovidStats): void =>{
    const client: Discord.Client = botUtils.getClient();

    client.on('message', async message => {
        //react w/ nice whenever counting channel reaches 69 or 420
        if(message.channel.id === '760627161920045087' && (message.content.startsWith('69') || message.content.startsWith('420'))){
            await message.react('✅');
            await message.react('🇳');
            await message.react('🇮');
            await message.react('🇨');
            await message.react('🇪');
            await message.react('😎');
            return message.channel.send('Nice 😎');
        }

        if(message.channel.id === '760627161920045087' && message.content.startsWith('100')){
            await message.react('✅');
            await message.react('💯');
        }

        //eval
        if(message.content.startsWith(`${botUtils.getBotConfig().prefix}eval`)){
            if(message.author.id !== '226457061959925761') return;
            let code = message.content.split(`${botUtils.getBotConfig().prefix}eval`)[1];
    
            const clean = text => {
                if (typeof(text) === "string")
                    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else 
                    return text;
            }
            try {
                let evaled = eval(code);
                
                if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
                
                if(clean(evaled).length > 1900) {
                    Utils.logInfo(clean(evaled));
                    message.channel.send('The message exceeded the text limit. Results are sent to console');
                }  
                else {
                    message.channel.send(clean(evaled), {code:"js"});
                }
    
            } catch (err) {
                message.channel.send(`:warning: __**\`Eval command execution failed.\`**__\`\`\`js\n${clean(err)}\n\`\`\``);
                Utils.logError(`Eval command execution failed.\n${err}`);
            }
        }
        //public bot commands
        messageEventHandler(botUtils, message);
    });
    client.on('ready', () => readyEventHandler(botUtils, covidStats));
    client.on('guildMemberAdd', member => guildMemberAdd(botUtils, member));

    client.on('error', err => utils.logError(err));
    client.on('warn', res => utils.logWarning(res));
    client.on('shardDisconnect', (event, shardID) => utils.logWarning(`Shard ${shardID} disconnected at ${new Date(Date.now())}`));
    client.on('shardReconnecting', shardID => utils.logWarning(`Shard ${shardID} reconnecting at ${new Date(Date.now())}`));
}

export = eventLoader;