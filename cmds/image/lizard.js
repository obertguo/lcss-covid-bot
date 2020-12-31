exports.run = (message) => require('./utils/embed')(message.client, 'lizard', message.channel.nsfw).then(res => message.channel.send(res)).catch(err => {message.channel.send(`Whoops, something happened... ${err}`)});

exports.desc = 'Ive heard that Mark Zuckerberg is a reptile so....';