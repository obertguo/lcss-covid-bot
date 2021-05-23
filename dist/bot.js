"use strict";
var Discord = require("discord.js");
var config = require("./static/config.json");
var BotUtils = require("./utils/BotUtils");
var eventLoader = require("./events/eventLoader");
var utils = require("./utils/GeneralUtils");
require('dotenv').config({ path: './static/.env' });
var botConfig = config.BotConfig;
var discordServerConfig = config.DiscordServerConfig;
var initializeBot = function (covidStats) {
    var intents = new Discord.Intents(Discord.Intents.NON_PRIVILEGED);
    intents.add('GUILD_MEMBERS');
    intents.add('GUILD_PRESENCES');
    var client = new Discord.Client({ ws: { intents: intents } });
    var botUtils = new BotUtils(client, botConfig, discordServerConfig);
    client.login(process.env.TOKEN);
    eventLoader(botUtils, covidStats);
    utils.readDirectory('./cmds').forEach(function (cmdDir) {
        utils.readDirectory("./cmds/" + cmdDir).filter(function (file) { return file.endsWith('.js'); }).forEach(function (cmd) {
            var command = {
                exec: require("./cmds/" + cmdDir + "/" + cmd).exec,
                category: cmdDir,
                name: cmd.split('.js')[0],
                description: require("./cmds/" + cmdDir + "/" + cmd).desc
            };
            botUtils.setCommand(command);
            utils.logInfo("Loaded " + cmd);
        });
    });
};
module.exports = initializeBot;
