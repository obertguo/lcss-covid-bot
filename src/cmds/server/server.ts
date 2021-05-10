import Discord = require('discord.js');
import BotUtils = require('../../utils/BotUtils');

exports.exec = (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> =>{
    return new Promise((resolve, reject) =>{
        try{            
            const embed = botUtils.constructEmbed();
            const guild = message.guild;

            const guildName = guild.name;
            const guildRegion = guild.region;
            const guildIcon = guild.iconURL();
            const guildTierLvl = guild.premiumTier;
            const guildSubCount = guild.premiumSubscriptionCount;
            const guildOwner = `<@${guild.owner.id}>`;

            const guildMembers = guild.members.cache.size;
            const users = guild.members.cache.filter(m => !m.user.bot).size;
            const bots = guild.members.cache.filter(m => m.user.bot).size;

            const emojis = guild.emojis.cache.size;
            const roles = guild.roles.cache.size;

            const channels = guild.channels.cache.size;
            const chanTxt = guild.channels.cache.filter(c => c.type === 'text').size;
            const chanVC = guild.channels.cache.filter(c => c.type === 'voice').size;
            const chanCategory = guild.channels.cache.filter(c => c.type === 'category').size;

            embed.setTitle(guildName);
            embed.setThumbnail(guildIcon);

            embed.addField(`About the Server`, `👑 Owner: ${guildOwner}\n🌎 Region: \`${guildRegion}\` | 🔺 Boosts: \`Tier ${guildTierLvl} (${guildSubCount} boosts)\``);
        
            embed.addField(`Server Features`, `😜 Custom Emotes: \`${emojis}\` (${botUtils.getBotConfig().prefix}emotes) | 📝 Roles: \`${roles}\` (${botUtils.getBotConfig().prefix}roles)`);

            embed.addField(`Members`, `👨‍👩‍👦 Total Members: \`${guildMembers}\` | 👷‍♂️ Users: \`${users}\` | 🤖 Bots: \`${bots}\``);

            embed.addField(`Channels`, `#️⃣ Total Channels: \`${channels}\`\n💬 Text: \`${chanTxt}\` | 🔉 Voice: \`${chanVC}\` | 🗳️ Categories: \`${chanCategory}\``);

            embed.setFooter(`Server created on ${guild.createdAt.toString().split(' ').slice(0, 4).join(' ')}`);

            message.channel.send(embed);

            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

exports.desc = "Summarizes information about the server.";