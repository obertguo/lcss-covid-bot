"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var embedFieldValueLimit = 1024;
var delimiter = ' ';
exports.exec = function (message, args, botUtils) {
    return new Promise(function (resolve, reject) {
        try {
            args.shift();
            var role_1 = args.join(' ');
            var roleObj_1 = message.guild.roles.cache.find(function (r) { return r.name.toLowerCase() === role_1.toLowerCase() || r.id === role_1; });
            if (!roleObj_1)
                return message.channel.send("Unable to find the role. Input a role name or role id");
            var roleMembers = roleObj_1.members.map(function (m) { return "<@" + m.id + ">"; });
            if (roleMembers.length === 0)
                roleMembers[0] = "No members";
            var roleMembersPaginated_1 = [''];
            var i_1 = 0;
            roleMembers.forEach(function (member) {
                //if current page exceeds limit, create new page
                if (roleMembersPaginated_1[i_1].length + member.length + delimiter.length > embedFieldValueLimit) {
                    ++i_1;
                    roleMembersPaginated_1[i_1] = '';
                }
                //add onto current page
                roleMembersPaginated_1[i_1] += member + delimiter;
            });
            var pages_1 = [];
            roleMembersPaginated_1.forEach(function (roleMember) {
                var embed = botUtils.constructEmbed();
                embed.setColor(roleObj_1.color);
                embed.setTitle("Role information for " + roleObj_1.name);
                embed.addField("Color", roleObj_1.hexColor);
                embed.addField("Role ID", roleObj_1.id);
                embed.addField("Mentionable", roleObj_1.mentionable);
                embed.addField("Created at", new Date(roleObj_1.createdTimestamp));
                embed.addField("Permissions", roleObj_1.permissions.toArray().join('\n') || 'No permissions');
                embed.addField("Members: " + roleObj_1.members.size, roleMember);
                pages_1.push(embed);
            });
            botUtils.paginate(message, pages_1, 1);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.desc = "Fetches information about a server role.";
