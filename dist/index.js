"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getCovidStats = require("./utils/covid/getCovidStats");
var initializeBot = require("./bot");
var utils = require("./utils/GeneralUtils");
if (process.argv[2] === 'update') {
    getCovidStats().then(function (covidStats) {
        initializeBot(covidStats);
    }).catch(function (err) {
        utils.logError(err);
    });
}
else
    initializeBot();
