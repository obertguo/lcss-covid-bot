const config = require('../../config.json');
const stats = require('../../stats.json');
const Discord = require('discord.js');

exports.run = async (message) =>{
    
    if(!config.allowedUsers.includes(message.author.id)) {
        return message.channel.send(new Discord.MessageEmbed().setDescription('**[Sike, you thought I would let you do it](https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO)**').setColor('#36393E'));
    };

    setName(message, config.channels.ontario.increase.id, config.channels.ontario.increase.desc + stats.ontario.increase);
    setName(message, config.channels.london.increase.id, config.channels.london.increase.desc + stats.london.increase);
}

const getChannel = (message, chanID) =>{
    return message.client.channels.cache.get(chanID);
}

const setName = (message, id, name) =>{
    const chan = getChannel(message, id);

        chan.setName(name).then(() =>{
            message.channel.send('Completed');
        }).catch(err =>{
            console.error(err);
            message.channel.send(`\`\`\`js\n${err}\`\`\``);
        });
    
}

exports.desc = 'Update Covid stats - mod only';