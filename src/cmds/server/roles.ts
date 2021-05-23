import Discord = require('discord.js');
import BotUtils = require('../../utils/BotUtils');
const embedDescriptionCharLimit = 2000;
const delimiter = ' ';

exports.exec = (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> =>{
    return new Promise((resolve, reject) =>{
        try{            
            const roleList = message.guild.roles.cache.map(r => `<@&${r.id}>`);
            const roleListPaginated: Array<Discord.MessageEmbed> = [];
            let i = 0;

            roleList.forEach(role =>{
                //initialize
                if(!roleListPaginated[i]) {
                    roleListPaginated[i] = botUtils.constructEmbed();
                    roleListPaginated[i].title = `Roles: ${roleList.length}`;
                    roleListPaginated[i].description = '';
                    roleListPaginated[i].setFooter(`Use ${botUtils.getBotConfig().prefix}role to view information about a role.`);
                }

                //if limit is exceeded, create new page
                if(roleListPaginated[i].description.length + role.length + delimiter.length > embedDescriptionCharLimit) {
                    ++i;
                    roleListPaginated[i] = botUtils.constructEmbed();
                    roleListPaginated[i].title = `Roles: ${roleList.length}`;
                    roleListPaginated[i].description = '';
                    roleListPaginated[i].setFooter(`Use ${botUtils.getBotConfig().prefix}role to view information about a role.`);
                }

                //add onto current page
                roleListPaginated[i].description += role + delimiter;
            });

            botUtils.paginate(message, roleListPaginated, 1);
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

exports.desc = "Lists all server roles";