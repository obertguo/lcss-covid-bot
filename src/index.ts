import getCovidStats = require('./utils/covid/getCovidStats');
import initializeBot = require('./bot');
import utils = require('./utils/GeneralUtils');

utils.createDBConnection().catch(err => utils.logError(err));

if(process.argv[2] === 'update'){
    getCovidStats().then(covidStats => {
        initializeBot(covidStats);
    }).catch(err =>{
        utils.logError(err);
    });
}

else initializeBot();