const utils = require('./Utils');

class London {

    cases = null;
    increase = null;

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


    async getData(){
        const url = 'https://app.powerbi.com/view?r=eyJrIjoiMzE5MzJlOTItOWE2ZS00MDNlLTlkNDEtMTcyYTg5OGFhMTFiIiwidCI6ImRjNTYxMjk1LTdjYTktNDFhOS04M2JmLTUwODM0ZDZhOWQwZiJ9';
        

        try{
            await this.driver.get(url);
            
            const document = await this.driver.getPageSource();

            let $ = this.cheerio.load(document);

            this.cases = utils.parse($($('.textRun')[42]).text());

            this.increase = utils.parse($($('.textRun')[41]).text());

        }
        
        catch(err){
            throw err;
        } 

        finally{
            await this.driver.quit();
        }
    }
}

module.exports = London;

