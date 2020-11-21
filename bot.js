require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix} = require('./config.json');
const fs = require('fs');

client.prefix = prefix;

require('./events/eventLoader')(client);

client.commands = new Discord.Collection;

fs.readdirSync('./cmds').forEach(cmdDir =>{
    fs.readdirSync(`./cmds/${cmdDir}`).filter(file => file.endsWith('.js')).forEach(cmd =>{
        client.commands.set(cmd.split('.js')[0], {
            exec: require(`./cmds/${cmdDir}/${cmd}`),
            info: {
                category: cmdDir,
                name: cmd.split('.js')[0],
                desc: require(`./cmds/${cmdDir}/${cmd}`).desc
            }
        });
        console.log(`Loaded ${cmd}`);
    });
});

client.login(process.env.TOKEN);