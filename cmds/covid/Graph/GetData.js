const axios = require('axios').default;

//Ontario API
//Query param can be date in the format of yyyy-mm-dd
const url = "https://data.ontario.ca/api/3/action/datastore_search?resource_id=8a88fe6d-d8fb-41a3-9d04-f0550a44999f&q=";

const getDataPromise = (days) =>{
    let records = [];
    return new Promise(async (resolve, reject) =>{
        try{
            let dt = new Date();
            let i = 0;

           while(i <= days){                     
                //construct date format to be used in the query param
                const dateFormat = formatDate(dt);
                
                const res = await axios.get(url + dateFormat);
                let dayTotal = 0;
                
                if(Array.isArray(res.data.result.records)) {
                    dayTotal = res.data.result.records.pop().Total;
                }

                //add record to beginning of array rather than the end
                records.unshift({
                    date: dateFormat,
                    total: dayTotal
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


const formatDate = (dt) =>{
    const year = dt.getFullYear();
    let month = dt.getMonth() + 1;
    let day = dt.getDate();

    if(month.toString().length === 1) month = "0" + month;
    
    if(day.toString().length === 1) day = "0" + day;

    return year + "-" + month + "-" + day;
}


module.exports = getDataPromise;
