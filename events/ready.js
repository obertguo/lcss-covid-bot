const config = require('../config.json');
const updateChannels = require('../utils/updateChannels');
const message = require('./message');

module.exports = (client) => {
    console.log('Logged in as ' + client.user.username);

    if(config.options.autoUpdate === true) updateChannels(client);
    client.guilds.cache.map(g => g.me.setNickname(''));
};
