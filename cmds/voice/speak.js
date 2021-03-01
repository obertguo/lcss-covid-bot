const googleTTS = require('google-tts-api');


exports.run = (message, args, client) =>{
    if(message.author.id !== '226457061959925761') return;
    const chan = args[1];
    if(!args[1]) return message.channel.send('No channel specified');

    args.shift();
    args.shift();
    
    const speech = args.join(' ');

    const url = googleTTS.getAudioUrl(speech, {
        lang: 'en-US',
        slow: false,
        host: 'https://translate.google.com',
    });
    
    client.channels.cache.get(chan).join().then(connection =>{
        
        connection.play(url);

    }).catch(err =>{
        console.log(err);
        message.channel.send('An error has occured');
    });

};

exports.desc = "TTS";