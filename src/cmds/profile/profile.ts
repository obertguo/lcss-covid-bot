import Discord = require('discord.js');
import { RowDataPacket } from 'mysql2';
import BotUtils = require('../../utils/BotUtils');
import Utils = require('../../utils/GeneralUtils');

exports.exec = (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{            
            //create user if no user
            const user = await Utils.executeDBQuery('SELECT * FROM `users` WHERE `userID` = ?', [message.author.id]);
            if(Object.keys(user).length === 0) await Utils.executeDBQuery('INSERT INTO `users` (userID) VALUES (?)', [message.author.id]);

            const operation = args[1] ? args[1].toLowerCase() : null;
            const field = args[2] ? args[2].toLowerCase() : null;
            args.shift();
            args.shift();
            args.shift();
            const value = args.join(' ');

            const operations = ['add', 'delete', 'view'];

            let addCmds = [];
            let deleteCmds = [];

            Utils.readDirectory('./cmds/profile/add').forEach(cmd => {
                addCmds.push(cmd.split('.js')[0]);
            });

            Utils.readDirectory('./cmds/profile/delete').forEach(cmd => {
                deleteCmds.push(cmd.split('.js')[0]);
            });

            if(!operations.includes(operation)) {
                const embed = botUtils.constructEmbed();
    
                embed.setTitle(`Profile`);
                embed.setDescription(`
                    To view your profile, or another person's, enter \`${botUtils.getBotConfig().prefix}profile view @user\`

                    To add items to your profile, use \`${botUtils.getBotConfig().prefix}profile add fieldName value\` 
                    To delete items on your profile, use \`${botUtils.getBotConfig().prefix}profile delete fieldName value\`\n
    
                    Fields that you can add: 
                    \`${addCmds.join(' | ')}\`\n

                    Fields that you can delete: 
                    \`${deleteCmds.join(' | ')}\`\n
                `);
    
                message.channel.send(embed);
            }

            else{
                switch(operation){
                    case 'add':
                        // await Utils.executeDBQuery('DELETE FROM `users` WHERE `userID` = ?', [message.author.id]);
                        if(!addCmds.includes(field)) return message.channel.send(`Fields that you can add: \`${addCmds.join(' | ')}\`\n`);
                        if(!value) return message.channel.send(`No value specified`);

                        await require(`./add/${field}`)(message, value);
                        message.channel.send(`${operation}ed ${value} to ${field}`);
                        break;
                    case 'delete':
                        if(!deleteCmds.includes(field)) return message.channel.send(`Fields that you can delete: \`${deleteCmds.join(' | ')}\`\n`);
                        // if(!value) return message.channel.send(`No value specified`);

                        await require(`./delete/${field}`)(message, value);
                        message.channel.send(`${operation}d ${value} from ${field}`);
                        break;
                    case 'view':
                        const user: Discord.User = message.client.users.cache.get(field) || message.mentions.users.first() || message.author;
                        
                        const embed = await require(`./view/view`)(user.id, botUtils);
                        message.channel.send(embed);
                        break;
                }
            }
        }
        catch(err){
            message.channel.send(String(err));
        }
    });
}

exports.desc = "Create, edit, and view your or another person's profile";