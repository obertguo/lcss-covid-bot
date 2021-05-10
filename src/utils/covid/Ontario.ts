import WebDriver = require('selenium-webdriver');
import cheerio = require('cheerio');
import Utils = require('../GeneralUtils');

class Ontario {
    private cases: number = null;
    private increase: number = null;
    private percentageIncrease: number = null;

    private driver: WebDriver.ThenableWebDriver = null;
    
    public constructor(driver: WebDriver.ThenableWebDriver){
        this.driver = driver;
    }

    public getTotalCases(): number{
        return this.cases;
    }

    public getDailyIncrease(): number{
        return this.increase;
    }

    public getPercentageIncrease(): number{
        return this.percentageIncrease;
    }

    public async getData(): Promise<void>{
        const url = 'https://www.ontario.ca/page/how-ontario-is-responding-covid-19';

        try{
            await this.driver.get(url);
            await this.driver.wait(WebDriver.until.elementLocated(WebDriver.By.id('section-0')), 2000);

            const document: string = await this.driver.getPageSource();
            
            let $ = cheerio.load(document);

            $ = cheerio.load($('.numeric.full-width')[0]);
            
            //get 2nd table row (# of cases) and the then children w/ td tag, and the text of the first element of it
            this.cases = Utils.parseInt($($('tr')[1]).children('td').first().text());

            //get 3rd table row (# of increase) and the then children w/ td tag, and the text of the first element of it
            this.increase = Utils.parseInt($($('tr')[2]).children('td').first().text());

            //get 3rd table row (# of increase) and the then children w/ td tag, and the text of the last element of it
            this.percentageIncrease = parseInt($($('tr')[2]).children('td').last().text());
        }
        
        catch(err){
            throw err;
        } 

        finally{
            await this.driver.quit();
        }
    }
}

export = Ontario;