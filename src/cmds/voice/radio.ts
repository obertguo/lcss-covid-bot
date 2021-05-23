import Discord = require('discord.js');
import BotUtils = require('../../utils/BotUtils');

const stations = {
    cbc: 'https://cbcliveradio-lh.akamaihd.net/i/CBCR1_LDN@48520/index_48_a-p.m3u8',
    sportsnet590: 'https://rogers-hls.leanstream.co/rogers/tor590.stream/48k/playlist.m3u8',
    jackfm: 'https://rogers-hls.leanstream.co/rogers/lon1023.stream/48k/playlist.m3u8',
    // virgin: 'https://16923.live.streamtheworld.com/CIQMFM_ADP/HLS/667/0/playlist.m3u8'
}

exports.exec = (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            const chan = <Discord.VoiceChannel>message.member.voice.channel;
            if(!chan) return message.channel.send('Please join a VC!');
    
            let station = '';
            if(stations[args[1]]) station = args[1];
            else {
                return message.channel.send('Pick from any available stations\n' + '```js\n' + 
                Object.keys(stations).join(', ') + '```' + `\nDo \`${botUtils.getBotConfig().prefix}radio stationName\` to play`);
            }
    
            (<Discord.GuildChannel>message.client.channels.cache.get(chan.id)).guild.me.setNickname(`${message.client.user.username} - ${station.toUpperCase()} Radio`); 

            const connection = await chan.join();
            const stationURL = stations[station];

            message.channel.send('Now playing ' + station.toUpperCase());
            const dispatcher = connection.play(stationURL);
            dispatcher.on('error', err => reject(err));
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

exports.desc = "Stream a radio station in VC";