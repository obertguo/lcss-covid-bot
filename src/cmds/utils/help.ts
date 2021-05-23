import Discord = require('discord.js');
import BotUtils = require('../../utils/BotUtils');
import Types = require('../../types');

exports.exec = async (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> => {
    return new Promise((resolve, reject) =>{
        try{
            let categories: Set<string> = new Set();
            botUtils.getCommandsMap().forEach(cmd => categories.add(cmd.category));
        
            const helpCategorySpecified = args[1];
            
            let embed = botUtils.constructEmbed();
        
            embed.setThumbnail(message.client.user.avatarURL());
        
            //if no category specified/invalid category, send generic help
            if(!categories.has(helpCategorySpecified)) {
                let categoryList = '';
        
                categories.forEach(category =>{
                    categoryList += `🔷 ${category}\n`;
                });
        
                embed.setTitle('Covid Bot Help');
        
                embed.addField('Viewing Commands', `Use \`${botUtils.getBotConfig().prefix}help {category}\` to view a list of commands. E.g., \`${botUtils.getBotConfig().prefix}${categories.values().next().value}\``);
                embed.addField('Available Categories', '```\n' + categoryList + '```');
            }
        
            //if category is specified, filter out commands in that category
            else{
                let commands: Types.IBotCommand[] = [];
        
                botUtils.getCommandsMap().forEach(cmd =>{
                    if(cmd.category === helpCategorySpecified) commands.push(cmd);
                });
        
                let commandList = '';
        
                commands.forEach(cmd =>{
                    commandList += `\`🔷${botUtils.getBotConfig().prefix}${cmd.name}\`\n> ${cmd.description}\n`;
                });
        
                const titleCaseCategory = helpCategorySpecified[0].toUpperCase() + helpCategorySpecified.substr(1);
        
                embed.setTitle(titleCaseCategory + ' Commands');
                embed.setDescription(commandList);
            }
            message.channel.send(embed);
            resolve();
        
            // if (categories.indexOf(args[1]) === -1) return message.channel.send({ embed: helpEmbeds.genericHelp(message.client, categories) });
            // const pages = helpEmbeds.categoryHelp(message, message.client, args);
            // message.client.paginate(message, pages, 2);
        }
        catch(err){
            reject(err);
        }
    });
}

exports.desc = 'Displays bot commands';