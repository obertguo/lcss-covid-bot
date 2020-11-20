const London = require('./London');
const Ontario = require('./Ontario');
const config = require('../config.json');

const driver = require('./driver');
const webdriver = require('selenium-webdriver');
const cheerio = require('cheerio');

const updateChannelsAsync = async (client) =>{
    console.log('Fetching stats...');
    try{
        const ontario = new Ontario(driver(), webdriver, cheerio);
        await ontario.getData();

        const london = new London(driver(), webdriver, cheerio);
        await london.getData();
        
        setName(client, config.channels.ontario.increase.id, config.channels.ontario.increase.desc + ontario.increase);
        setName(client, config.channels.london.increase.id, config.channels.london.increase.desc + london.increase);

        console.log('Updated stats');
    }
    catch(err){
        console.error(err);
    }
}


const getChannel = (client, chanID) =>{
    return client.channels.cache.get(chanID);
}

const setName = (client, id, name) =>{
    const chan = getChannel(client, id);
    chan.setName(name);
}

module.exports = updateChannelsAsync;