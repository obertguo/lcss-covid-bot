const config = require('../config.json');
const updateChannels = require('../utils/updateChannels');

module.exports = (client) => {
    console.log('Logged in as ' + client.user.username);

    if(config.options.autoUpdate === true) updateChannels(client);
};
