module.exports = (client, message) =>{
    if(message.author.bot || !message.content.toLowerCase().startsWith(client.prefix)) return;

    const args = message.content.toLowerCase().split(client.prefix)[1].split(' ').filter(v => v!== '');
    const cmd = args[0];

    if(!client.commands.has(cmd)) return;

    try{
        client.commands.get(cmd).exec.run(message, args, client);
    } 
    
    catch(err) {
        message.channel.send(`❌ \`Oops, something broke... You can report this to Kai#6119\n\`\`\`js\n${err}\`\`\``);
        console.error(`ERR:\n${err}`);
    }
}