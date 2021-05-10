const stations = {
    cbc: 'https://cbcliveradio-lh.akamaihd.net/i/CBCR1_LDN@48520/index_48_a-p.m3u8',
    sportsnet590: 'https://rogers-hls.leanstream.co/rogers/tor590.stream/48k/playlist.m3u8',
    jackfm: 'https://rogers-hls.leanstream.co/rogers/lon1023.stream/48k/playlist.m3u8',
    virgin: 'https://16923.live.streamtheworld.com/CIQMFM_ADP/HLS/667/0/playlist.m3u8'
}

exports.run = (message, args, client) =>{
    // const chan = args[1];
    // if(!args[1]) return message.channel.send('No channel specified');
    const chan = message.member.voice.channel;
    if(!chan) return message.channel.send('Please join a VC!');
    
    // let station = '';
    // if(stations[args[2]]) station = args[2];
    // else station = 'cbc'; 

    let station = '';
    if(stations[args[1]]) station = args[1];
    else {
        return message.channel.send('Pick from any available stations\n' + '```js\n' + Object.keys(stations).join(', ') + '```' + `\nDo \`${client.prefix}radio stationName\` to play`);
    }

    client.channels.cache.get(chan.id).guild.me.setNickname(`Covid Bot - ${station.toUpperCase()} Radio`); 
    
    client.channels.cache.get(chan.id).join().then(async connection =>{
        // const url = await getStreamLinkPromise();
        const radio = stations[station];
        play(client, message.channel.id, station, connection, radio);

    }).catch(err =>{
        console.log(err);
        message.channel.send('An error has occured');
    });

};


const play = async (client, chanID, station, connection, url) =>{
    client.channels.cache.get(chanID).send('Now playing ' + station.toUpperCase());
    const dispatcher = connection.play(url);
    // const link = await getStreamLinkPromise();
    // dispatcher.on('finish', () => play(connection, link));
    dispatcher.on('error', err => {
        console.log(err);
        message.channel.send(err).catch(err => {});
    });
}

// const play = async (connection) =>{
//     try{
//         await retrieveOutputFile();
//         const dispatcher = connection.play('./output.ts');
//         dispatcher.on('finish', () => play(connection));
//     }
//     catch(err) {
//         console.error(err);
//     }
    
// }


exports.desc = "Stream a radio station in VC";