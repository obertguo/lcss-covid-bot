const config = require('../../config.json');
const fs = require('fs');

exports.run = async (message) =>{
    if(message.guild.id !== config.options.lockdown.server) return;
    if(message.author.id === '226457061959925761' || message.member.roles.cache.has(config.options.moderation.adminRole)){
    
    try {
        const msg = await message.channel.send(`Lockdown mode is \`${config.options.lockdown.status ? 'enabled' : 'disabled'}\`. React below to ${config.options.lockdown.status ? 'disable' : 'enable'} it.`);
        await msg.react(`✅`);

        const filter = (reaction, user) => {
            return ['✅'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        const collector = msg.createReactionCollector(filter, { time: 1000 * 40, max: 1});

        collector.on('collect', async reaction =>{
            config.options.lockdown.status = !config.options.lockdown.status;

            if(config.options.lockdown.status === false){
                //update cache
                await message.guild.members.fetch();

                message.guild.roles.cache.get(config.options.lockdown.role).members.map(m => {
                    m.roles.remove(config.options.lockdown.role);
                });
            }
            fs.writeFileSync('./config.json', JSON.stringify(config, null, 4));
        });

        collector.on('end', () => {
            msg.edit(`Lockdown mode is \`${config.options.lockdown.status ? 'enabled' : 'disabled'}\`\n${config.options.lockdown.status ? `Incoming users will recieve the \`${message.guild.roles.cache.get(config.options.lockdown.role).name}\` role when they join.`: `Users with the \`${message.guild.roles.cache.get(config.options.lockdown.role).name}\` role will now have it removed.`}`);
        });
    }
    catch(err){
        msg.edit(`An error has occured. ${err.substring(0, 1000)}`);
    }
}
}


exports.desc = 'Server lockdown';