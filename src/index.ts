import getCovidStats = require('./utils/covid/getCovidStats');
import initializeBot = require('./bot');
import utils = require('./utils/GeneralUtils');

if(process.argv[2] === 'update'){
    getCovidStats().then(covidStats => {
        initializeBot(covidStats);
    }).catch(err =>{
        utils.logError(err);
    });
}

else initializeBot();