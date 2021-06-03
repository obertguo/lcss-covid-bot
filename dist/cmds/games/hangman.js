"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hangman = require("./hangmanUtils/hangmanWords");
exports.exec = function (message, args, botUtils) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var guesses, maxGuesses, embed, categories, category, isQuote, answer, by, msg_id, chan_id, quoteURL, gameOver, quotes, quote, words, wordMap, i, char, guess_1, incorrectGuess, i, msg, gameFilter, gameStateMessage, gameEmbed, collected, guessedChar, i, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    guesses = 0;
                    maxGuesses = 10;
                    embed = botUtils.constructEmbed();
                    categories = Object.keys(hangman.hangmanWords.Words).concat(Object.keys(hangman.hangmanWords.Quotes));
                    category = categories[Math.floor(Math.random() * categories.length)];
                    isQuote = hangman.hangmanWords.Quotes[category] ? true : false;
                    answer = null;
                    by = null;
                    msg_id = null;
                    chan_id = null;
                    quoteURL = 'https://discord.com/channels/700559773028057098/';
                    gameOver = false;
                    if (isQuote) {
                        quotes = hangman.hangmanWords.Quotes[category].quotes;
                        quote = quotes[Math.floor(Math.random() * quotes.length)];
                        answer = quote.quote.toLowerCase().split('');
                        by = quote.by;
                        msg_id = quote.id;
                        chan_id = hangman.hangmanWords.Quotes[category].channel_id;
                    }
                    else {
                        words = hangman.hangmanWords.Words[category];
                        answer = words[Math.floor(Math.random() * words.length)].toLowerCase().split('');
                    }
                    wordMap = new Map();
                    for (i = 0; i < answer.length; ++i) {
                        char = answer[i];
                        //char already in map
                        if (wordMap.has(char)) {
                            wordMap.get(char).charPos.push(i);
                        }
                        //add char to map
                        else {
                            wordMap.set(char, { charPos: [i], guessed: false });
                        }
                    }
                    guess_1 = [];
                    incorrectGuess = [];
                    for (i = 0; i < answer.length; ++i)
                        guess_1[i] = '_';
                    if (wordMap.has(' ')) {
                        wordMap.get(' ').guessed = true;
                        wordMap.get(' ').charPos.forEach(function (pos) {
                            guess_1[pos] = ' ';
                        });
                    }
                    embed.setDescription('Starting game');
                    return [4 /*yield*/, message.channel.send(embed)];
                case 1:
                    msg = _a.sent();
                    gameFilter = function (msg) {
                        return msg.author.id === message.author.id;
                    };
                    gameStateMessage = 'Starting Game';
                    _a.label = 2;
                case 2:
                    if (!!gameOver) return [3 /*break*/, 5];
                    gameEmbed = botUtils.constructEmbed();
                    gameEmbed.addField("Category", category);
                    gameEmbed.addField("Guesses", guesses + ' / ' + maxGuesses);
                    gameEmbed.addField("Message", gameStateMessage);
                    gameEmbed.addField('Incorrect Guesses', incorrectGuess.length === 0 ? 'No incorrect guesses' : '`' + incorrectGuess.join(', ') + '`');
                    gameEmbed.setDescription("`" + guess_1.join(' ') + "`");
                    msg.edit(gameEmbed);
                    return [4 /*yield*/, message.channel.awaitMessages(gameFilter, { time: 30 * 1000, max: 1, errors: ['time'] })];
                case 3:
                    collected = _a.sent();
                    return [4 /*yield*/, collected.first().delete().catch(function () { })];
                case 4:
                    _a.sent();
                    guessedChar = collected.first().content.charAt(0).toLowerCase();
                    if (wordMap.has(guessedChar)) {
                        if (!wordMap.get(guessedChar).guessed) {
                            //user guessed letter
                            wordMap.get(guessedChar).guessed = true;
                            gameStateMessage = "\u2705 Correct guess: `" + guessedChar + "`";
                            //update guess array
                            for (i = 0; i < wordMap.get(guessedChar).charPos.length; ++i) {
                                guess_1[wordMap.get(guessedChar).charPos[i]] = guessedChar;
                            }
                            //if guessed, check if all letters have been guessed
                            if (!guess_1.includes('_'))
                                gameOver = true;
                        }
                        else {
                            //user already guessed the letter
                            gameStateMessage = "\u26A0\uFE0F Already guessed: `" + guessedChar + "`";
                        }
                    }
                    else {
                        //user didnt guess letter
                        gameStateMessage = "\u274C Incorrect guess: `" + guessedChar + "`";
                        incorrectGuess.push(guessedChar);
                        ++guesses;
                        //if failed to guess, check if max guesses is reached
                        if (guesses === maxGuesses)
                            gameOver = true;
                    }
                    return [3 /*break*/, 2];
                case 5:
                    embed.setTitle("Game Over");
                    embed.setDescription(guesses === maxGuesses ? "You've lost" : "You've won!");
                    embed.addField('Category', category);
                    if (isQuote) {
                        //display quote
                        embed.addField('Quote', answer.join(''));
                        embed.addField('By', by);
                        embed.addField('Message link', quoteURL + chan_id + '/' + msg_id);
                    }
                    else {
                        //dont reveal word
                        // embed.addField('Word', answer.join(''));
                    }
                    msg.edit(embed);
                    resolve();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.log(err_1);
                    message.channel.send('Timed out');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); });
};
exports.desc = "Play a game of hangman.";
