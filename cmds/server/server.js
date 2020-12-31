exports.run = (message) => message.channel.send({embed: require('./serverUtils/embed')(message.guild, message)});

exports.desc = 'View server information';