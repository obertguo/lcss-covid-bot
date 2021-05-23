
    exports.run = (message, args, client) =>{
        if(message.author.id !== '226457061959925761') return;
        const chan = args[1];
        if(!args[1]) return message.channel.send('No channel specified');

    client.channels.cache.get(chan).join().then(connection =>{
        play(connection);
    }).catch(err =>{
        console.log(err);
        message.channel.send('An error has occured');
    });
};

const play = (connection) =>{
    console.log('test');
    const dispatcher = connection.play('https://translate.google.com/translate_tts?ie=UTF-8&q=hello%20world&tl=en-US&total=1&idx=0&textlen=11&client=tw-ob&prev=input&ttsspeed=1');
    dispatcher.on('finish', () => play(connection));
}

exports.desc = "Music stuff";