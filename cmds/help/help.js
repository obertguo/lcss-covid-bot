const helpEmbeds = require('./helpUtils/embed');

exports.run = async (message, args) => {

    const categories = Array.from(new Set(message.client.commands.map(v => v.info.category)));

    if (categories.indexOf(args[1]) === -1) return message.channel.send({ embed: helpEmbeds.genericHelp(message.client, categories) });
    if (!message.channel.nsfw && args[1] === 'nsfw') return message.channel.send(message.client.embedBuilder().setDescription(`⚠️ Use \`${message.client.prefix}help nsfw\` in a NSFW channel to view a complete command list`));

    const pages = helpEmbeds.categoryHelp(message, message.client, args);

    message.client.paginate(message, pages, 2);

}

exports.desc = 'View bot commands';