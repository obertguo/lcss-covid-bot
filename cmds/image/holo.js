exports.run = (message) => require('./utils/embed')(message.client, 'holo', message.channel.nsfw).then(res => message.channel.send(res)).catch(err => {message.channel.send(`Whoops, something happened... ${err}`)});

exports.desc = 'Holo = popular fox girl';