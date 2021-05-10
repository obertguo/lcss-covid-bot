import Ontario = require('./Ontario');
import London = require('./London');
import utils = require('../GeneralUtils');
import Types = require('../../types');

const getCovidStats = (): Promise<Types.ICovidStats> =>{
    return new Promise(async(resolve, reject): Promise<void> =>{
        try{
            const ontario = new Ontario(utils.createHeadlessWebDriver());
            await ontario.getData();
        
            const london = new London(utils.createHeadlessWebDriver());
            await london.getData();

            const data: Types.ICovidStats = {
                ontario:{
                    totalCases: ontario.getTotalCases(),
                    dailyIncrease: ontario.getDailyIncrease()
                },
                london:{
                    totalCases: london.getTotalCases(),
                    dailyIncrease: london.getDailyIncrease()
                },
                retrievedTimestamp: Date.now()
            }

            utils.logInfo(`Updated covid data\n${utils.stringifyJSON(data)}`);
            utils.writeJSON('./covidstats.json', data);

            resolve(data);
        }
        catch(err){
            reject(err);
        }
    });
}

export = getCovidStats;