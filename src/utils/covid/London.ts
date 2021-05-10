import WebDriver = require('selenium-webdriver');
import cheerio = require('cheerio');
import Utils = require('../GeneralUtils');

class London {
    private cases: number = null;
    private increase: number = null;

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

    public async getData(): Promise<void>{
        const url: string = 'https://app.powerbi.com/view?r=eyJrIjoiMzE5MzJlOTItOWE2ZS00MDNlLTlkNDEtMTcyYTg5OGFhMTFiIiwidCI6ImRjNTYxMjk1LTdjYTktNDFhOS04M2JmLTUwODM0ZDZhOWQwZiJ9';

        try{
            await this.driver.get(url);

            //Starting Apr 17, page doesnt open case status by default - thus, find the button element and then click it
            const caseStatusPage = await this.driver.findElements(WebDriver.By.className('themableBackgroundColor'));
            await caseStatusPage[12].click();
            
            const document = await this.driver.getPageSource();

            let $ = cheerio.load(document);

            this.cases = Utils.parseInt($($('.textRun')[46]).text());

            this.increase = Utils.parseInt($($('.textRun')[45]).text());
        }
        
        catch(err){
            throw err;
        } 

        finally{
            await this.driver.quit();
        }
    }
}

export = London;