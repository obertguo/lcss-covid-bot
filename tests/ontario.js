const Ontario = require('../utils/Ontario');

const driver = require('../utils/driver');
const webdriver = require('selenium-webdriver');
const cheerio = require('cheerio');

const getDataAsync = async () =>{
    const ontario = new Ontario(driver(), webdriver, cheerio);
    await ontario.getData();

    console.log('Ontario Cases: ' + ontario.cases);
    console.log('Ontario Increase: ' + ontario.increase);
    console.log('Ontario Percentage Increase: ' + ontario.percentageIncrease);
}

getDataAsync();