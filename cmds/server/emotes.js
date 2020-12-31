exports.run = (message) => {

    let boostlvl = message.guild.premiumTier;
    let emojiSlots = 50;
    let animatedEmojiSlots = 50;
    if(boostlvl === 1) emojiSlots = 100;
    if(boostlvl === 2) emojiSlots = 150;
    if(boostlvl === 3) emojiSlots = 250; 

    message.channel.send({embed: message.client.embedBuilder().setTitle(`Custom Emotes: ${message.guild.emojis.cache.size}`)
    .setDescription(message.guild.emojis.cache.filter(e => e.animated === false).size === 0 ? `Emotes: ${message.guild.emojis.cache.filter(e => e.animated === false).size}/${emojiSlots}\nNo emotes`: `Emotes: ${message.guild.emojis.cache.filter(e => e.animated === false).size}/${emojiSlots}\n` + message.guild.emojis.cache.filter(e => e.animated === false).map(e => e.toString()).join(' | '))
    .addField(`Animated Emotes: ${message.guild.emojis.cache.filter(e => e.animated === true).size}/${animatedEmojiSlots}`, message.guild.emojis.cache.filter(e => e.animated === true).size === 0 ? 'No animated emotes': message.guild.emojis.cache.filter(e => e.animated === true).map(e => e.toString()).join(' |'))})
    .catch(err => message.channel.send(err));
}
exports.desc = 'Lists all custom emotes in this server';