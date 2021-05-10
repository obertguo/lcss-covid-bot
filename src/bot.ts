import Discord = require('discord.js');
import config = require('./static/config.json');
import Types = require('./types');
import BotUtils = require('./utils/BotUtils');
import eventLoader = require('./events/eventLoader');
import utils = require('./utils/GeneralUtils');

require('dotenv').config({path: './static/.env'});
const botConfig: Types.IBotConfig = config.BotConfig;
const discordServerConfig: Types.IDiscordServerConfig = config.DiscordServerConfig;

const initializeBot = (covidStats?: Types.ICovidStats) =>{
    const intents = new Discord.Intents(Discord.Intents.NON_PRIVILEGED);
    intents.add('GUILD_MEMBERS');
    intents.add('GUILD_PRESENCES');

    const client: Discord.Client = new Discord.Client({ws: {intents: intents}});
    const botUtils: BotUtils = new BotUtils(client, botConfig, discordServerConfig);

    client.login(process.env.TOKEN);
    eventLoader(botUtils, covidStats);

    utils.readDirectory('./cmds').forEach(cmdDir =>{
        utils.readDirectory(`./cmds/${cmdDir}`).filter(file => file.endsWith('.js')).forEach(cmd =>{

            const command: Types.IBotCommand = {
                exec: require(`./cmds/${cmdDir}/${cmd}`).exec,
                category: cmdDir,
                name: cmd.split('.js')[0],
                description: require(`./cmds/${cmdDir}/${cmd}`).desc
            }

            botUtils.setCommand(command);
            utils.logInfo(`Loaded ${cmd}`);
        });
    });
}

export = initializeBot;
