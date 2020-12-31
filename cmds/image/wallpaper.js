exports.run = (message) => require('./utils/embed')(message.client, 'wallpaper', message.channel.nsfw).then(res => message.channel.send(res.setDescription(res.image.url))).catch(err => {message.channel.send(`Whoops, something happened... ${err}`)});

exports.desc = 'Get some wallpapers';