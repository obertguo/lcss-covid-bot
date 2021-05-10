"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = function (message, args, botUtils) {
    return new Promise(function (resolve, reject) {
        try {
            var embed = botUtils.constructEmbed();
            var guild = message.guild;
            var guildName = guild.name;
            var guildRegion = guild.region;
            var guildIcon = guild.iconURL();
            var guildTierLvl = guild.premiumTier;
            var guildSubCount = guild.premiumSubscriptionCount;
            var guildOwner = "<@" + guild.owner.id + ">";
            var guildMembers = guild.members.cache.size;
            var users = guild.members.cache.filter(function (m) { return !m.user.bot; }).size;
            var bots = guild.members.cache.filter(function (m) { return m.user.bot; }).size;
            var emojis = guild.emojis.cache.size;
            var roles = guild.roles.cache.size;
            var channels = guild.channels.cache.size;
            var chanTxt = guild.channels.cache.filter(function (c) { return c.type === 'text'; }).size;
            var chanVC = guild.channels.cache.filter(function (c) { return c.type === 'voice'; }).size;
            var chanCategory = guild.channels.cache.filter(function (c) { return c.type === 'category'; }).size;
            embed.setTitle(guildName);
            embed.setThumbnail(guildIcon);
            embed.addField("About the Server", "\uD83D\uDC51 Owner: " + guildOwner + "\n\uD83C\uDF0E Region: `" + guildRegion + "` | \uD83D\uDD3A Boosts: `Tier " + guildTierLvl + " (" + guildSubCount + " boosts)`");
            embed.addField("Server Features", "\uD83D\uDE1C Custom Emotes: `" + emojis + "` (" + botUtils.getBotConfig().prefix + "emotes) | \uD83D\uDCDD Roles: `" + roles + "` (" + botUtils.getBotConfig().prefix + "roles)");
            embed.addField("Members", "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66 Total Members: `" + guildMembers + "` | \uD83D\uDC77\u200D\u2642\uFE0F Users: `" + users + "` | \uD83E\uDD16 Bots: `" + bots + "`");
            embed.addField("Channels", "#\uFE0F\u20E3 Total Channels: `" + channels + "`\n\uD83D\uDCAC Text: `" + chanTxt + "` | \uD83D\uDD09 Voice: `" + chanVC + "` | \uD83D\uDDF3\uFE0F Categories: `" + chanCategory + "`");
            embed.setFooter("Server created on " + guild.createdAt.toString().split(' ').slice(0, 4).join(' '));
            message.channel.send(embed);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.desc = "Summarizes information about the server.";
