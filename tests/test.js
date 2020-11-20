const London = require('../utils/London');
const Ontario = require('../utils/Ontario');

const driver = require('../utils/driver');
const webdriver = require('selenium-webdriver');
const cheerio = require('cheerio');

const getDataAsync = async () =>{
    const ontario = new Ontario(driver(), webdriver, cheerio);
    await ontario.getData();

    const london = new London(driver(), webdriver, cheerio);
    await london.getData();
    
    console.log(`Ontario Cases: ${ontario.cases} \nOntario Increase: ${ontario.increase} \nOntario Percentage Increase: ${ontario.percentageIncrease}`);
    console.log(`London Cases: ${london.cases} \nLondon Increase ${london.increase}`);
}

getDataAsync();