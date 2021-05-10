const { MessageManager } = require("discord.js");

exports.run = (message, args, client) =>{
    // const chan = args[1];
    // if(!args[1]) return message.channel.send('No channel specified');

    try{
        // client.channels.cache.get(chan).leave()
        // client.channels.cache.get(chan).guild.me.setNickname('');
        message.guild.me.voice.channel.leave();
        message.guild.me.setNickname('');
        message.channel.send('Disconnected from VC');
    }
    catch(err) {}
};


exports.desc = "Disconnect";