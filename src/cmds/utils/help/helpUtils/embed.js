
module.exports.genericHelp = (client, categories) => {
    return client.embedBuilder()
    .setTitle('Help and Information')
    .setDescription(`**COMMANDS**\nUse **\`${client.prefix}help {category}\`** to view bot commands. E.g., \`${client.prefix}image\`\n\n**CATEGORIES**\n\`\`\`css\n${categories.join(', ')}\`\`\``)
    .setThumbnail(client.user.avatarURL());
}

module.exports.categoryHelp = (message, client, args) => {

    let help = new Map();
    for (let i = 0; i < client.commands.filter(v => v.info.category === args[1]).size; i++) {
        const name = client.prefix + client.commands.filter(v => v.info.category === args[1]).map(v => v.info.name)[i];
        const desc = client.commands.filter(v => v.info.category === args[1]).map(v => v.info.desc)[i];

        help.set(name, desc);
    }

    const listLength = 10 * 2;
    let cmdList = '';
    help.forEach((v, k) => cmdList += `🔹 \`${k}\`` + `\n> ${v}\n`);
    cmdList = cmdList.split('\n').filter(v => v !== '');

    let pages = [];
    while (cmdList.length !== 0) {
        if (cmdList.length - listLength < listLength) pages.push(client.embedBuilder().setTitle(`${args[1].charAt(0).toUpperCase() + args[1].substr(1)} Commands`).setDescription(cmdList.splice(0, cmdList.length).join('\n')));
        else pages.push(client.embedBuilder().setTitle(`${args[1].charAt(0).toUpperCase() + args[1].substr(1)} Commands`).setDescription(cmdList.splice(0, listLength).join('\n')));
    }

    return pages;
}