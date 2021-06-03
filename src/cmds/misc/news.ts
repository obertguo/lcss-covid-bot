import Discord = require('discord.js');
import BotUtils = require('../../utils/BotUtils');
import Utils = require('../../utils/GeneralUtils');

exports.exec = async (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> => {
    return new Promise(async (resolve, reject) =>{
        try{
            //News API https://newsapi.org/docs
            const countryCodes = [
                'ae',
                'ar',
                'at',
                'au',
                'be',
                'bg',
                'br',
                'ca',
                'ch',
                'cn',
                'co',
                'cu',
                'cz',
                'de',
                'eg',
                'fr',
                'gb',
                'gr',
                'hk',
                'hu',
                'id',
                'ie',
                'il',
                'in',
                'it',
                'jp',
                'kr',
                'lt',
                'lv',
                'ma',
                'mx',
                'my',
                'ng',
                'nl',
                'no',
                'nz',
                'ph',
                'pl',
                'pt',
                'ro',
                'rs',
                'ru',
                'sa',
                'se',
                'sg',
                'si',
                'sk',
                'th',
                'tr',
                'tw',
                'ua',
                'us',
                've',
                'za'
            ];

            const apiKey = 'f67b054fcddf4691bedf315b5ac774c4';
            let baseURL = 'https://newsapi.org/v2/top-headlines?';

            //Default to canadian news if no args
            if(!args[1]) baseURL += 'country=ca';

            //If 1st arg has country code, include it
            else if(countryCodes.includes(args[1])) {
                baseURL += `country=${args[1]}`; 

                //If additional query is made after country code, include it
                if(args[2]){
                    args.shift()
                    args.shift();
                    baseURL += `&q=${args.join(' ')}`;
                }
            }
            //Otherwise, no country code. Append search query 
            else {
                args.shift();
                baseURL += `q=${args.join(' ')}`;
            }
            //Append api key
            baseURL += `&apiKey=${apiKey}`;

            const res = await Utils.getRequest(baseURL);
            
            if(res.data.status !== 'ok' || res.data.totalResults === 0) {
                return message.channel.send('Failed to fetch articles. Try broadening your search.\n\nCommand options:\n' + 
                `1. \`${botUtils.getBotConfig().prefix}news\` returns top Canadian headlines\n` + 
                `2. \`${botUtils.getBotConfig().prefix}news <ISO 3166-1 country code>\` returns top headlines for specified country\n` +
                `3. \`${botUtils.getBotConfig().prefix}news <search query>\` returns top headlines related to the search query\n` +
                `4. \`${botUtils.getBotConfig().prefix}news <ISO 3166-1 country code> <search query>\` returns top headlines related to the search query for specified country\n`+
                'Country codes: ```\n' + countryCodes + '```');
            }

            const articles: Discord.MessageEmbed[] = [];

            res.data.articles.forEach(article =>{
                const embed = botUtils.constructEmbed();
                embed.setImage(article.urlToImage);
                embed.setAuthor(article.source.name + '🔸' + (article.author ? `By ${article.author}` : ''));
                embed.setTitle(article.title);
                embed.setDescription(`Published ${article.publishedAt}`);
                embed.addField(`Description`, article.description || 'No description provided');
                embed.addField(`Content`, article.content || 'No content provided');
                embed.addField(`Link`, article.url || 'No link provided');
                
                articles.push(embed);
            });

            botUtils.paginate(message, articles, 5);
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

exports.desc = 'Retrieves news';