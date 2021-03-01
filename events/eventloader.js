  module.exports = (client) =>{
    
    client.on('ready', () => require('./ready')(client));
    client.on('guildMemberAdd', (member) => require('./guildMemberAdd.js')(member));

    client.on('message', message => require('./message')(client, message));
    client.on('error', err => console.log(err));
    client.on('warn', res => console.log(res));
    client.on('shardDisconnect', (event, shardID) => console.log(`Shard ${shardID} disconnected at ${Date(Date.now)}`));
    
    client.on('shardReconnecting', id => {
        console.log(`Shard ${id} reconnecting at ${Date(Date.now)}`);
        //client.user.setActivity(`y/help | ${client.guilds.cache.size} servers.` , {type : "STREAMING"});
    });

    // client.on('voiceStateUpdate', async (oldState, newState) =>{
    //   const vcChanID = oldState.channelID || newState.channelID;

    //   //If bot is not playing in the guild. do nothing
    //   if(!client.channels.cache.get(vcChanID).guild.me.voice.channel) return;

    //   //If VC update is emitted from a channel that the bot is not connected to, do nothing
    //   if(client.channels.cache.get(vcChanID).guild.me.voice.channel.id !== vcChanID) return;

    //   //If bot is the only member connected in VC, wait x seconds and recheck. If no one rejoined, disconnect
    //   if(client.channels.cache.get(vcChanID).members.size === 1){
    //     await new Promise(resolve => setTimeout(resolve, 10 * 1000)); 

    //     if(client.channels.cache.get(vcChanID).members.size === 1){
    //       client.channels.cache.get(vcChanID).guild.me.voice.channel.leave();
    //     }   
    //   }
    // });
}