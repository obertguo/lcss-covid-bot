const Ontario = require('../../utils/Ontario');
const London = require('../../utils/London');

const config = require('../../config.json');

const driver = require('../../utils/driver');
const webdriver = require('selenium-webdriver');
const cheerio = require('cheerio');


exports.run = async (message) =>{

    if(!config.allowedUsers.includes(message.author.id)) return;

    const msg = await message.channel.send('Fetching data...');

    const ontario = new Ontario(driver(), webdriver, cheerio);
    await ontario.getData();

    const london = new London(driver(), webdriver, cheerio);
    await london.getData();
    
    setName(message, config.channels.ontario.increase.id, config.channels.ontario.increase.desc + ontario.increase);
    setName(message, config.channels.london.increase.id, config.channels.london.increase.desc + london.increase);

    msg.edit('Completed');
}

const getChannel = (message, chanID) =>{
    return message.client.channels.cache.get(chanID);
}

const setName = (message, id, name) =>{
    const chan = getChannel(message, id);
    chan.setName(name);
}

exports.desc = 'Fetch Ontario Covid Stats';