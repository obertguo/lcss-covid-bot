const config = require('../../config.json');
const stats = require('../../stats.json');

exports.run = async (message) =>{

    if(!config.allowedUsers.includes(message.author.id)) return;

    setName(message, config.channels.ontario.increase.id, config.channels.ontario.increase.desc + stats.ontario.increase);
    setName(message, config.channels.london.increase.id, config.channels.london.increase.desc + stats.london.increase);

    message.channel.send('Completed');
}

const getChannel = (message, chanID) =>{
    return message.client.channels.cache.get(chanID);
}

const setName = (message, id, name) =>{
    const chan = getChannel(message, id);
    chan.setName(name);
}

exports.desc = 'Fetch Ontario Covid Stats';