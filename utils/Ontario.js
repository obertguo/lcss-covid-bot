const utils = require('./Utils');
class Ontario {

    cases = null;
    increase = null;
    percentageIncrease = null;

    driver = null;
    webdriver = null;
    cheerio = null;

    constructor(driver, webdriver, cheerio){
        this.driver = driver;
        this.webdriver = webdriver;
        this.cheerio = cheerio;
    }

    get cases(){
        return this.cases;
    }

    get increase(){
        return this.increase;
    }

    get percentageIncrease(){
        return this.percentageIncrease;
    }


    async getData(){
        const url = 'https://www.ontario.ca/page/how-ontario-is-responding-covid-19';

        try{
            await this.driver.get(url);
            await this.driver.wait(this.webdriver.until.elementLocated(this.webdriver.By.id('section-0')), 2000);

            const document = await this.driver.getPageSource();
            
            let $ = this.cheerio.load(document);

            $ = this.cheerio.load($('.numeric.full-width')[0]);
            
            //get 2nd table row (# of cases) and the then children w/ td tag, and the text of the first element of it
            this.cases = utils.parse($($('tr')[1]).children('td').first().text());

            //get 3rd table row (# of increase) and the then children w/ td tag, and the text of the first element of it
            this.increase = utils.parse($($('tr')[2]).children('td').first().text());

            //get 3rd table row (# of increase) and the then children w/ td tag, and the text of the last element of it
            this.percentageIncrease = utils.parse($($('tr')[2]).children('td').last().text());
        }
        
        catch(err){
            throw err;
        } 

        finally{
            await this.driver.quit();
        }
    }
}

module.exports = Ontario;

