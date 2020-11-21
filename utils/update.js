const Ontario = require('./Ontario');
const London = require('./London');

const fs = require('fs');

const driver = require('./driver');
const webdriver = require('selenium-webdriver');
const cheerio = require('cheerio');

const update = () =>{

    return new Promise (async (resolve, reject) =>{
        try{
            const ontario = new Ontario(driver(), webdriver, cheerio);
            await ontario.getData();
        
            const london = new London(driver(), webdriver, cheerio);
            await london.getData();

            const data = {
                ontario:{
                    cases: ontario.cases,
                    increase: ontario.increase
                },
                london:{
                    cases: london.cases,
                    increase: london.increase
                },
                date: Date(Date.now())
            }

            console.log(JSON.stringify(data, null, 4));

            fs.writeFileSync('./stats.json', JSON.stringify(data, null, 4));
            console.log('Updated data');

            resolve();
        }
        catch(err){
            reject(err);
        }
    });   
}

module.exports = update;
    