const url = 'https://9anime.to/schedule?tz=GMT-0400';
const webdriver = require('selenium-webdriver');
const cheerio = require('cheerio');

const scrapeTodayAnimeSchedule = () =>{
    let driver = require('../../../utils/driver');
    return new Promise(async (resolve, reject) =>{
        try {
            driver = driver();
            await driver.get(url);

            //wait for site to load
            await driver.wait(webdriver.until.elementLocated(webdriver.By.className('current')), 2000);

            //get page src and quit driver
            let document = await driver.getPageSource();
            await driver.quit();

            let $ = cheerio.load(document);
            
            //get today's schedule, and then get all children, which reps shows
            let items = $($($('.active').parent()).children('.items')).children();
            
            //store result
            let res = [];

            //iterate through each children/show
            for(i = 0; i < items.length; i++){
                const title = $(items[i]).find('a').text();
                const time = $(items[i]).find('time').text();
                const link = $(items[i]).find('a').attr('href');
                res.push({
                    title: title,
                    time: time,
                    link: link
                });
            }
            //resolve
            resolve(res);
        }
        catch(err){
            reject(err);
        }
    });
}

module.exports = scrapeTodayAnimeSchedule;
