import Discord = require('discord.js');

exports.exec = (message: Discord.Message): Promise<void> =>{
    return new Promise((resolve, reject) =>{
        try{
            message.guild.me.voice.channel.leave();
            message.guild.me.setNickname('');
            message.channel.send('Disconnected from VC');
        }
        catch(err){}
    });
}

exports.desc = "Disconnect bot from VC";