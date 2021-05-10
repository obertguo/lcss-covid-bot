import Discord = require('discord.js');
import BotUtils = require('../../utils/BotUtils');
const embedFieldValueLimit = 1024;
const delimiter = ' ';

exports.exec = (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> =>{
    return new Promise((resolve, reject) =>{
        try{            
            args.shift();
            const role = args.join(' ');

            const roleObj = message.guild.roles.cache.find(r => r.name.toLowerCase() === role.toLowerCase() || r.id === role);
            if(!roleObj) return message.channel.send(`Unable to find the role. Input a role name or role id`);

            const roleMembers = roleObj.members.map(m => `<@${m.id}>`);
            if(roleMembers.length === 0) roleMembers[0] = "No members";

            let roleMembersPaginated: Array<string> = [''];
            let i = 0;

            roleMembers.forEach(member =>{
                //if current page exceeds limit, create new page
                if(roleMembersPaginated[i].length + member.length + delimiter.length > embedFieldValueLimit) {
                    ++i;
                    roleMembersPaginated[i] = '';
                }

                //add onto current page
                roleMembersPaginated[i] += member + delimiter;
            });


            const pages: Array<Discord.MessageEmbed> = [];

            roleMembersPaginated.forEach(roleMember => {
                const embed = botUtils.constructEmbed();
                embed.setColor(roleObj.color);
                embed.setTitle(`Role information for ${roleObj.name}`);
                embed.addField(`Color`, roleObj.hexColor);
                embed.addField(`Role ID`, roleObj.id);
                embed.addField(`Mentionable`, roleObj.mentionable);

                embed.addField(`Created at`, new Date(roleObj.createdTimestamp));
                
                embed.addField(`Permissions`, roleObj.permissions.toArray().join('\n') || 'No permissions');
                embed.addField(`Members: ${roleObj.members.size}`, roleMember);
                pages.push(embed);
            });

            botUtils.paginate(message, pages, 1);
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

exports.desc = "Fetches information about a server role.";