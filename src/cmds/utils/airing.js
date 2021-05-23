
const getTodayAnimeSchedule = require('./animeUtil/getTodayAnimeSchedule');
exports.run = async(message, args, client) =>{
    try{
        const schedule = await getTodayAnimeSchedule(); 

        const embed = client.embedBuilder();
        embed.setTitle(`Today's Airing Animes`);
        schedule.forEach(show =>{
            embed.addField(show.title, `[Available at ${show.time}](${show.link})`);
        });
        
        message.channel.send(embed);
        
    }
    
    catch(err){
        message.channel.send('An error has occured');
        console.error(err);
    }
};


exports.desc = "Get today's airing animes";
