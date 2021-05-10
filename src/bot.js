require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix} = require('./config.json');
const fs = require('fs');

client.prefix = prefix;
client.embedBuilder = require('./utils/embedBuilder');
client.paginate = require('./utils/paginate');
client.deletedMessages = new Map();

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

client.on('message', message =>{
    if(message.content.startsWith('c/eval')){
        if(message.author.id !== '226457061959925761') return;
        let code = message.content.split('c/eval')[1];

        const weatherAPIKey = '58b52d35c5248d24cd6fd015673cfa65';
        const geocodeAPIKey = 'C4CDAeHmPk699sHsn5G2XThoVtrLAZif';

        const clean = text => {
            if (typeof(text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else 
                return text;
        }

        try {
            let evaled = eval(code);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            
            if(clean(evaled).length > 1000) {
                console.log(clean(evaled));
                message.channel.send('The message exceeded the text limit. Results are sent to console');
            }  
            else {
                message.channel.send(clean(evaled), {code:"js"});
            }

        } catch (err) {
            message.channel.send(`:warning: __**\`Eval Command Execution Failed.\`**__\`\`\`js\n${clean(err)}\n\`\`\``);
        }
    }

    if(message.content.startsWith('c/msgs')){
        // if(message.author.id !== '226457061959925761') return;

        if(client.deletedMessages.has(message.guild.id)){
            const msgs = client.deletedMessages.get(message.guild.id);
            const embed = client.embedBuilder();
            embed.title = 'Recently deleted messages';
            embed.footer = {text: "^ Most recent ^"}

            embed.description = '';
            
            let charCount = 0;

            msgs.every(msg =>{
                let desc = `<@${msg.author}> in <#${msg.channel}>\n**Sent** ${new Date(msg.createdTimestamp).toLocaleString()} | **Deleted** ${new Date(msg.deletedTimestamp).toLocaleString()}\n${msg.content}\n\n`;
                if(desc.length + charCount > 2048) return false;
                
                embed.description += desc;
                charCount += desc.length;
                
                return true;
            });
            
            message.channel.send(embed);
        }
        else{
            message.channel.send('No deleted messages to display');
        }
    }
});