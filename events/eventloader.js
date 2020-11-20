  module.exports = (client) =>{
    
    client.on('ready', () => require('./ready')(client));

    client.on('message', message => require('./message')(client, message));
    client.on('error', err => console.log(err));
    client.on('warn', res => console.log(res));
    client.on('shardDisconnect', (event, shardID) => console.log(`Shard ${shardID} disconnected at ${Date(Date.now)}`));
    
    client.on('shardReconnecting', id => {
        console.log(`Shard ${id} reconnecting at ${Date(Date.now)}`);
        //client.user.setActivity(`y/help | ${client.guilds.cache.size} servers.` , {type : "STREAMING"});
    });
    
}