const fs = require('fs');
const songs = [
    fs.readdirSync('./cmds/voice/memes').filter(file => file.endsWith('.mp3')),
    fs.readdirSync('./cmds/voice/anime').filter(file => file.endsWith('.mp3'))
];
let songType = 0;
    

exports.run = (message, args, client) =>{
    const chan = args[1];
    if(!args[1]) return message.channel.send('No channel specified');
    if(args[2] === 'anime') songType = 1;

    client.channels.cache.get(chan).guild.me.setNickname('Covid Bot - Playing ' + (songType === 0 ? 'Meme Music' : 'Anime Songs'));

    client.channels.cache.get(chan).join().then(connection =>{
        
        play(connection);

    }).catch(err =>{
        console.log(err);
        message.channel.send('An error has occured');
    })

};

const play = (connection) =>{
    const i = Math.floor(Math.random() * (songs[songType].length));
    const path = './cmds/music/' + (songType === 0 ? 'memes' : 'anime') + '/';

    const dispatcher = connection.play(path + songs[songType][i]);
    dispatcher.on('finish', () => play(connection));
}

exports.desc = "Music stuff";