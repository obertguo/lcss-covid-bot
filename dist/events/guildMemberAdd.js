"use strict";
var guildMemberAdd = function (botUtils, member) {
    if (botUtils.getDiscordServerConfig().lockdown.status === false)
        return;
    member.roles.add(botUtils.getDiscordServerConfig().lockdown.incomingUserRole);
};
module.exports = guildMemberAdd;
