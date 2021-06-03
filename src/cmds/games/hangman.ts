import Discord = require('discord.js');
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'node:constants';
import BotUtils = require('../../utils/BotUtils');
import hangman = require('./hangmanUtils/hangmanWords');

interface wordMapValue{
    charPos: number[],
    guessed: boolean
}

exports.exec = (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            let guesses = 0;
            const maxGuesses = 10;
            const embed = botUtils.constructEmbed();

            //Get words and quotes categories
            const categories = Object.keys(hangman.hangmanWords.Words).concat(Object.keys(hangman.hangmanWords.Quotes));

            //get random category
            const category = categories[Math.floor(Math.random() * categories.length)];

            //determine if category is part of quotes or words
            const isQuote: boolean = hangman.hangmanWords.Quotes[category] ? true : false;

            let answer: string[] = null;
            let by: string = null;
            let msg_id: string = null;
            let chan_id: string = null;
            const quoteURL = 'https://discord.com/channels/700559773028057098/';
            let gameOver = false;

            if(isQuote){
                let quotes: Array<hangman.Quote> = hangman.hangmanWords.Quotes[category].quotes;
                const quote = quotes[Math.floor(Math.random() * quotes.length)];
                answer = quote.quote.toLowerCase().split('');
                by = quote.by;
                msg_id = quote.id;
                chan_id = hangman.hangmanWords.Quotes[category].channel_id;
            }
            else{
                let words: Array<string> = hangman.hangmanWords.Words[category];
                answer = words[Math.floor(Math.random() * words.length)].toLowerCase().split('');
            }
            
            const wordMap: Map<string, wordMapValue> = new Map();

            for(let i = 0; i < answer.length; ++i){
                const char = answer[i];
                //char already in map
                if(wordMap.has(char)){
                    wordMap.get(char).charPos.push(i);
                }
                //add char to map
                else{
                    wordMap.set(char, {charPos: [i], guessed: false});
                }
            }

            let guess: string[] = [];
            let incorrectGuess: string[] = [];
            for(let i = 0; i < answer.length; ++i) guess[i] = '_';

            if(wordMap.has(' ')) {
                wordMap.get(' ').guessed = true;
                wordMap.get(' ').charPos.forEach(pos =>{
                    guess[pos] = ' ';
                });
            }

            embed.setDescription('Starting game');
            const msg = await message.channel.send(embed);

            const gameFilter = (msg: Discord.Message) => {
                return msg.author.id === message.author.id;
            }

            let gameStateMessage = 'Starting Game';

            while(!gameOver){
                let gameEmbed = botUtils.constructEmbed();
                gameEmbed.addField(`Category`, category);
                gameEmbed.addField(`Guesses`, guesses + ' / ' + maxGuesses);
                gameEmbed.addField(`Message`, gameStateMessage);
                gameEmbed.addField('Incorrect Guesses', incorrectGuess.length === 0 ? 'No incorrect guesses' : '`' + incorrectGuess.join(', ') + '`');
                gameEmbed.setDescription(`\`${guess.join(' ')}\``);
                msg.edit(gameEmbed);

                // msg.edit(`Category: ${category}\n\`${guess.join(' ')}\nGuesses: ${guesses} / ${maxGuesses}\``);
                //collect user response
                const collected = await message.channel.awaitMessages(gameFilter, {time: 30 * 1000, max: 1, errors: ['time']});
                await collected.first().delete().catch(() =>{});
                const guessedChar = collected.first().content.charAt(0).toLowerCase();

                if(wordMap.has(guessedChar)){
                    if(!wordMap.get(guessedChar).guessed){
                        //user guessed letter
                        wordMap.get(guessedChar).guessed = true;
                        gameStateMessage = `✅ Correct guess: \`${guessedChar}\``;

                        //update guess array
                        for(let i = 0; i < wordMap.get(guessedChar).charPos.length; ++i){
                            guess[wordMap.get(guessedChar).charPos[i]] = guessedChar;
                        }
                        //if guessed, check if all letters have been guessed
                        if(!guess.includes('_')) gameOver = true;
                    }
                    else{
                        //user already guessed the letter
                        gameStateMessage = `⚠️ Already guessed: \`${guessedChar}\``;
                    }
                }
                else{
                    //user didnt guess letter
                    gameStateMessage = `❌ Incorrect guess: \`${guessedChar}\``;
                    incorrectGuess.push(guessedChar);
                    ++guesses;
                    //if failed to guess, check if max guesses is reached
                    if(guesses === maxGuesses) gameOver = true;
                }
            }

            embed.setTitle(`Game Over`);
            embed.setDescription(guesses === maxGuesses ? "You've lost" : "You've won!");
            embed.addField('Category', category);
            
            if(isQuote){
                //display quote
                embed.addField('Quote', answer.join(''));
                embed.addField('By', by);
                embed.addField('Message link', quoteURL + chan_id + '/' + msg_id);
            }
            else{
                //dont reveal word
                // embed.addField('Word', answer.join(''));
            }

            msg.edit(embed);
            resolve();
        }
        catch(err){
            console.log(err);
            message.channel.send('Timed out');
        }
    });
}

exports.desc = `Play a game of hangman.`;