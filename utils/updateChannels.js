const stats = require('../stats.json');
const config = require('../config.json');

const updateChannelsAsync = async (client) =>{
    console.log('Fetching stats...');
    
    setName(client, config.channels.ontario.increase.id, config.channels.ontario.increase.desc + stats.ontario.increase);
    setName(client, config.channels.london.increase.id, config.channels.london.increase.desc + stats.london.increase);

    console.log('Updated stats');
}


const getChannel = (client, chanID) =>{
    return client.channels.cache.get(chanID);
}

const setName = (client, id, name) =>{
    const chan = getChannel(client, id);
    chan.setName(name);
}

module.exports = updateChannelsAsync;