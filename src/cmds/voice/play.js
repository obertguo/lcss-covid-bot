const fs = require('fs');
const songs = [
    fs.readdirSync('./cmds/voice/memes').filter(file => file.endsWith('.mp3')),
    fs.readdirSync('./cmds/voice/anime').filter(file => file.endsWith('.mp3'))
];
let songType = 0;

let queue = [];

exports.run = (message, args, client) =>{
    const chan = message.member.voice.channel;
    if(!chan) return message.channel.send('Please join a VC!');

    if(args[1] === 'anime') songType = 1;
    queue = songs[songType];

    client.channels.cache.get(chan.id).guild.me.setNickname('Covid Bot - Playing ' + (songType === 0 ? 'Meme Music' : 'Anime Songs'));

    client.channels.cache.get(chan.id).join().then(connection =>{
        for(k = 0; k < 50; k++){
            const i = Math.floor(Math.random() * (queue.length));
            const j = Math.floor(Math.random() * (queue.length));
            
            const temp = queue[i]
            queue[i] = queue[j];
            queue[j] = temp;
        }

        console.log(queue);

        play(connection);

    }).catch(err =>{
        console.log(err);
        message.channel.send('An error has occured');
    });
};

const play = (connection) =>{
    // const i = Math.floor(Math.random() * (songs[songType].length));
    if(queue.length === 0) return;

    const path = (songType === 0 ? 'memes' : 'anime') + '/';
    const songName = queue.shift();
    const dispatcher = connection.play(require('path').join(__dirname, path + songName));

    console.log(require('path').join(__dirname, path + songName));
    dispatcher.on('finish', () => play(connection));

}

exports.desc = "Music stuff";