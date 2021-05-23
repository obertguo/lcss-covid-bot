"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var embedFieldValueLimit = 1024;
var delimiter = ' | ';
exports.exec = function (message, args, botUtils) {
    return new Promise(function (resolve, reject) {
        try {
            var boostlvl = message.guild.premiumTier;
            //Default emoji slots w/ no boosts
            var emojiSlots = 50;
            var animatedEmojiSlots = 50;
            //https://discordia.me/en/server-limits
            if (boostlvl === 1) {
                emojiSlots = 100;
                animatedEmojiSlots = 100;
            }
            if (boostlvl === 2) {
                emojiSlots = 150;
                animatedEmojiSlots = 150;
            }
            if (boostlvl === 3) {
                emojiSlots = 250;
                animatedEmojiSlots = 250;
            }
            //get emotes
            var nonAnimatedEmotes = message.guild.emojis.cache.filter(function (e) { return !e.animated; }).map(function (e) { return "<:" + e.name + ":" + e.id + ">"; });
            var animatedEmotes = message.guild.emojis.cache.filter(function (e) { return e.animated; }).map(function (e) { return "<a:" + e.name + ":" + e.id + ">"; });
            var totalEmotes = nonAnimatedEmotes.length + animatedEmotes.length;
            if (nonAnimatedEmotes.length === 0)
                nonAnimatedEmotes[0] = "No emotes";
            if (animatedEmotes.length === 0)
                animatedEmotes[0] = "No animated emotes";
            var nonAnimatedEmotesPaginated_1 = [''];
            var animatedEmotesPaginated_1 = [''];
            var i_1 = 0;
            nonAnimatedEmotes.forEach(function (emote) {
                //Create a new page if text limit of current page is exceeded
                if (nonAnimatedEmotesPaginated_1[i_1].length + emote.length + delimiter.length > embedFieldValueLimit) {
                    ++i_1;
                    nonAnimatedEmotesPaginated_1[i_1] = '';
                }
                //Add onto current page
                nonAnimatedEmotesPaginated_1[i_1] += emote + delimiter;
            });
            i_1 = 0;
            animatedEmotes.forEach(function (emote) {
                if (animatedEmotesPaginated_1[i_1].length + emote.length + delimiter.length > embedFieldValueLimit) {
                    ++i_1;
                    animatedEmotesPaginated_1[i_1] = '';
                }
                animatedEmotesPaginated_1[i_1] += emote + delimiter;
            });
            //figure out max pages
            var maxPages = nonAnimatedEmotesPaginated_1.length < animatedEmotesPaginated_1.length ? animatedEmotesPaginated_1.length : nonAnimatedEmotesPaginated_1.length;
            var pages = [];
            //create pages
            for (var i_2 = 0; i_2 < maxPages; i_2++) {
                pages[i_2] = botUtils.constructEmbed();
                pages[i_2].title = "Total emotes: " + totalEmotes;
                pages[i_2].addField("Non animated emotes: " + message.guild.emojis.cache.filter(function (e) { return !e.animated; }).size + "/" + emojiSlots, nonAnimatedEmotesPaginated_1[i_2] || nonAnimatedEmotes[nonAnimatedEmotes.length - 1]);
                pages[i_2].addField("Animated emotes: " + message.guild.emojis.cache.filter(function (e) { return e.animated; }).size + "/" + animatedEmojiSlots, animatedEmotesPaginated_1[i_2] || animatedEmotesPaginated_1[animatedEmotesPaginated_1.length - 1]);
            }
            botUtils.paginate(message, pages, 1);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.desc = "Lists all server emotes";
