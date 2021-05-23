import Discord = require('discord.js');

exports.exec = (message: Discord.Message): Promise<void>=>{
    return new Promise(async (resolve, reject) =>{
        try{
            const msg = await message.channel.send('Pinging...');
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(`${ping}ms`);
            
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

exports.desc = "Gets the bot's ping";