"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var embedDescriptionCharLimit = 2000;
var delimiter = ' ';
exports.exec = function (message, args, botUtils) {
    return new Promise(function (resolve, reject) {
        try {
            var roleList_1 = message.guild.roles.cache.map(function (r) { return "<@&" + r.id + ">"; });
            var roleListPaginated_1 = [];
            var i_1 = 0;
            roleList_1.forEach(function (role) {
                //initialize
                if (!roleListPaginated_1[i_1]) {
                    roleListPaginated_1[i_1] = botUtils.constructEmbed();
                    roleListPaginated_1[i_1].title = "Roles: " + roleList_1.length;
                    roleListPaginated_1[i_1].description = '';
                    roleListPaginated_1[i_1].setFooter("Use " + botUtils.getBotConfig().prefix + "role to view information about a role.");
                }
                //if limit is exceeded, create new page
                if (roleListPaginated_1[i_1].description.length + role.length + delimiter.length > embedDescriptionCharLimit) {
                    ++i_1;
                    roleListPaginated_1[i_1] = botUtils.constructEmbed();
                    roleListPaginated_1[i_1].title = "Roles: " + roleList_1.length;
                    roleListPaginated_1[i_1].description = '';
                    roleListPaginated_1[i_1].setFooter("Use " + botUtils.getBotConfig().prefix + "role to view information about a role.");
                }
                //add onto current page
                roleListPaginated_1[i_1].description += role + delimiter;
            });
            botUtils.paginate(message, roleListPaginated_1, 1);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.desc = "Lists all server roles";
