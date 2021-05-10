
exports.run = (message, args, client) =>{
    if(message.author.id !== '226457061959925761') return;

    // message.guild.channels.cache.map(c => {
    //     if(c.type !== 'category' && c.id !== '734139663903752292'){
    //         const name = c.name;
    //         const reversed = name.split('').reverse().join('');

    //         c.setName(reversed);
    //     }
    // });
    // const data = require('./channelNames');
    
    // data.forEach(chan =>{
    //     client.channels.cache.get(chan.id).setName(chan.name);
    // });

}

exports.desc = "Top secret";