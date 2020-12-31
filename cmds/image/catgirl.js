exports.run = (message) => require('./utils/embed')(message.client, 'gecg', message.channel.nsfw).then(res => message.channel.send(res)).catch(err => {message.channel.send(`Whoops, something happened... ${err}`)});

exports.desc = 'get some catgirls';