import Discord = require('discord.js');
import BotUtils = require('../utils/BotUtils');

const guildMemberAdd = (botUtils: BotUtils, member: Discord.GuildMember) =>{
   if (botUtils.getDiscordServerConfig().lockdown.status === false) return;

   member.roles.add(botUtils.getDiscordServerConfig().lockdown.incomingUserRole);
}

export = guildMemberAdd;