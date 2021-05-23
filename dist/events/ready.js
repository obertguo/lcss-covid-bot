"use strict";
var utils = require("../utils/GeneralUtils");
var readyEventHandler = function (botUtils, covidStats) {
    utils.logInfo("Logged in as " + botUtils.getClient().user.username);
    botUtils.getClient().guilds.cache.map(function (g) { return g.me.setNickname(''); });
    if (covidStats) {
        try {
            var ontarioChan = botUtils.getClient().channels.cache.get(botUtils.getDiscordServerConfig().covid.dailyIncrease.channels.ontario);
            var londonChan = botUtils.getClient().channels.cache.get(botUtils.getDiscordServerConfig().covid.dailyIncrease.channels.london);
            ontarioChan.setName(botUtils.getDiscordServerConfig().covid.dailyIncrease.appendedTextDescription.ontario + " " + covidStats.ontario.dailyIncrease.toLocaleString());
            londonChan.setName(botUtils.getDiscordServerConfig().covid.dailyIncrease.appendedTextDescription.london + " " + covidStats.london.dailyIncrease.toLocaleString());
            utils.logInfo("Updated covid stats in " + botUtils.getClient().guilds.cache.get(botUtils.getDiscordServerConfig().serverID).name);
        }
        catch (err) {
            console.error(err);
        }
    }
};
module.exports = readyEventHandler;
