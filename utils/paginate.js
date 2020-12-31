module.exports = async (message, pages, timeMin) =>{
    if(pages.length === 1) return message.channel.send(pages[0]);

    let page = 1;

    try {
        msg = await message.channel.send(pages[0].setFooter(`Page ${page}/${pages.length}`));

        await msg.react('◀');
        await msg.react('▶');

        const filter = (reaction, user) => (reaction.emoji.name === '◀' || reaction.emoji.name === '▶') && user.id === message.author.id,
            collector = msg.createReactionCollector(filter, { time: timeMin * 1000 * 60 });

        collector.on('collect', reaction => {
            reaction.users.remove(message.author.id).catch(() => { });

            if (reaction.emoji.name === '◀' && page > 1) page -= 1;
            if (reaction.emoji.name === '▶' && page < pages.length) page += 1;
            msg.edit(pages[page - 1].setFooter(`Page ${page}/${pages.length}`));

        });

        collector.on('end', () => msg.edit(pages[page - 1].setFooter(`Pagination Timeout. Please use the command again to view more pages`)));
    }
    catch (err) {
        message.channel.send('Oops, something went wrong...');
        console.error(err);
    }
}