import Discord = require('discord.js');
import BotUtils = require('../../utils/BotUtils');
const embedFieldValueLimit = 1024;
const delimiter = ' | ';

exports.exec = (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> =>{
    return new Promise((resolve, reject) =>{
        try{            
            let boostlvl = message.guild.premiumTier;
            //Default emoji slots w/ no boosts
            let emojiSlots = 50;
            let animatedEmojiSlots = 50;
            
            //https://discordia.me/en/server-limits
            if(boostlvl === 1) {
                emojiSlots = 100;
                animatedEmojiSlots = 100;
            }

            if(boostlvl === 2) {
                emojiSlots = 150;
                animatedEmojiSlots = 150;
            }

            if(boostlvl === 3) {
                emojiSlots = 250; 
                animatedEmojiSlots = 250;
            }

            //get emotes
            const nonAnimatedEmotes = message.guild.emojis.cache.filter(e => !e.animated).map(e => `<:${e.name}:${e.id}>`);
            const animatedEmotes = message.guild.emojis.cache.filter(e => e.animated).map(e => `<a:${e.name}:${e.id}>`);

            const totalEmotes = nonAnimatedEmotes.length + animatedEmotes.length;

            if(nonAnimatedEmotes.length === 0) nonAnimatedEmotes[0] = "No emotes";
            if(animatedEmotes.length === 0) animatedEmotes[0] = "No animated emotes";

            const nonAnimatedEmotesPaginated: Array<string> = [''];
            const animatedEmotesPaginated: Array<string> = [''];
            let i = 0;

            nonAnimatedEmotes.forEach(emote =>{
                //Create a new page if text limit of current page is exceeded
                if(nonAnimatedEmotesPaginated[i].length + emote.length + delimiter.length > embedFieldValueLimit) {
                    ++i;
                    nonAnimatedEmotesPaginated[i] = '';
                }
                    
                //Add onto current page
                nonAnimatedEmotesPaginated[i] += emote + delimiter;
            });

            i = 0;
            animatedEmotes.forEach(emote =>{
                if(animatedEmotesPaginated[i].length + emote.length + delimiter.length > embedFieldValueLimit) {
                    ++i;
                    animatedEmotesPaginated[i] = '';
                }   
                    
                animatedEmotesPaginated[i] += emote + delimiter;
            });

            //figure out max pages
            const maxPages = nonAnimatedEmotesPaginated.length < animatedEmotesPaginated.length ? animatedEmotesPaginated.length : nonAnimatedEmotesPaginated.length;
            const pages: Array<Discord.MessageEmbed> = [];

            //create pages
            for(let i = 0; i < maxPages; i++){
                pages[i] = botUtils.constructEmbed();
                pages[i].title = `Total emotes: ${totalEmotes}`;

                pages[i].addField(`Non animated emotes: ${message.guild.emojis.cache.filter(e => !e.animated).size}/${emojiSlots}`, nonAnimatedEmotesPaginated[i] || nonAnimatedEmotes[nonAnimatedEmotes.length - 1]);
                pages[i].addField(`Animated emotes: ${message.guild.emojis.cache.filter(e => e.animated).size}/${animatedEmojiSlots}`, animatedEmotesPaginated[i] || animatedEmotesPaginated[animatedEmotesPaginated.length - 1]);
            }

            botUtils.paginate(message, pages, 1);
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

exports.desc = "Lists all server emotes";