const London = require('../utils/London');

const driver = require('../utils/driver');
const webdriver = require('selenium-webdriver');
const cheerio = require('cheerio');

const getDataAsync = async () =>{
    const london = new London(driver(), webdriver, cheerio);
    await london.getData();

    console.log('Cases ' + london.cases + '\n' + 'Increase ' + london.increase);
}

getDataAsync();