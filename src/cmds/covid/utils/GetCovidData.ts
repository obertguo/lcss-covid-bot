import Utils = require('../../../utils/GeneralUtils');
import Types = require('../../../types');
const url = "https://data.ontario.ca/api/3/action/datastore_search?resource_id=8a88fe6d-d8fb-41a3-9d04-f0550a44999f&q=";

const getDataPromise = (days: number): Promise<Array<Types.IOntarioCovidData>> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            let records: Array<Types.IOntarioCovidData> = [];

            let dt = new Date();
            let i = 0;

            while(i <= days){                     
                //construct date format to be used in the query param - format follows yyyy-mm-dd
                const dateFormat = formatDate(dt);
                
                const res = await Utils.getRequest(url + dateFormat);
                let dayTotal = 0;
                
                if(Array.isArray(res.data.result.records)) {
                    dayTotal = res.data.result.records.pop().Total;
                }

                //add record to beginning of array rather than the end (organized from earliest to latest)
                records.unshift({
                    date: dateFormat,
                    dailyIncrease: dayTotal
                });

                //set date by 1 day less
                dt.setDate(dt.getDate() - 1);
                i++;
            }

            resolve(records);
        }
        catch(err){
            reject(err);
        }
    });
}

const formatDate = (dt: Date): string =>{
    const year: number = dt.getFullYear();
    let month: number | string = dt.getMonth() + 1;
    let day: number | string = dt.getDate();
    
    if(month.toString().length === 1) month = "0" + month.toString();
    
    if(day.toString().length === 1) day = "0" + day.toString();

    return year.toString() + "-" + month.toString() + "-" + day.toString();
}

export = getDataPromise;