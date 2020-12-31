let embed = require('./utils/embed');
let cmd = 'baka';

exports.run = async (message) =>{


    try{
        let mentions = message.mentions.members.map(m => m.nickname || m.user.username);

        if(mentions.length === 0) return embed(message.client, cmd, null).then(res => message.channel.send(res));
        if(mentions.length === 1 && (mentions[0] === message.member.nickname || mentions[0] === message.author.username)) return embed(message.client, cmd, 'You are the baka you **BAKA!**').then(res => message.channel.send(res));

        if(mentions.length === 1) return embed(message.client, cmd, `**${message.member.nickname || message.author.username}** thinks that **${mentions.join(', ')}** is a baka!`).then(res => message.channel.send(res));
        
        mentions[mentions.length-1] = `and ${mentions[mentions.length-1]}`;
        embed(message.client, cmd, `**${message.member.nickname || message.author.username}** thinks that **${mentions.join(', ')}** are bakas!`).then(res => message.channel.send(res));
        
    }
    catch(err){
        message.channel.send('Something borked... ' + err);
    } 
}

exports.desc = `...baka!`;