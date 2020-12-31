module.exports = (guild, message) => {
    const guildName = guild.name,
        guildRegion = guild.region,
        guildIcon = guild.iconURL(),
        guildTierLvl = guild.premiumTier,
        guildSubCount = guild.premiumSubscriptionCount,
        // guildOwner = guild.owner.user.username + '#' + guild.owner.user.discriminator;

        guildMembers = guild.members.cache.size,
        // users = guild.members.cache.filter(m => m.user.bot === false).size,
        // bots = guild.members.cache.filter(m => m.user.bot === true).size

        emojis = guild.emojis.cache.size,
        roles = guild.roles.cache.size,

        chan = guild.channels.cache.size,
        chanTxt = guild.channels.cache.filter(c => c.type === 'text').size,
        chanVC = guild.channels.cache.filter(c => c.type === 'voice').size,
        chanCategory = guild.channels.cache.filter(c => c.type === 'category').size;


    return message.client.embedBuilder()
        .setTitle(guildName)
        // .setDescription(`👑 Owner: \`${guildOwner}\` <@${guild.owner.user.id}>`)
        .setColor(message.client.embedColor)
        .setThumbnail(guildIcon)
        .addField('\u200B', `
        🌎 Region: \`${guildRegion}\` | 🔺 Boosts: \`Level ${guildTierLvl} (${guildSubCount} boosts)\`\n\n
        😜 Custom Emotes: \`${emojis}\` (${message.client.prefix}emotes) | 📝 Roles: \`${roles}\` (${message.client.prefix}roles)\n\n👨‍👩‍👦 Online Members: \`${guildMembers}\`\n\n
        #️⃣ Channels: \`${chan}\` | 💬 Text: \`${chanTxt}\` | 🔉 Voice: \`${chanVC}\` | 🗳️ Categories: \`${chanCategory}\``)
        .setFooter(`Server created on ${guild.createdAt.toString().split(' ').slice(0, 4).join(' ')}`);
}