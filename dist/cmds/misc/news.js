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
var Utils = require("../../utils/GeneralUtils");
exports.exec = function (message, args, botUtils) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var countryCodes, apiKey, baseURL, res, articles_1, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            countryCodes = [
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
                            apiKey = 'f67b054fcddf4691bedf315b5ac774c4';
                            baseURL = 'https://newsapi.org/v2/top-headlines?';
                            //Default to canadian news if no args
                            if (!args[1])
                                baseURL += 'country=ca';
                            //If 1st arg has country code, include it
                            else if (countryCodes.includes(args[1])) {
                                baseURL += "country=" + args[1];
                                //If additional query is made after country code, include it
                                if (args[2]) {
                                    args.shift();
                                    args.shift();
                                    baseURL += "&q=" + args.join(' ');
                                }
                            }
                            //Otherwise, no country code. Append search query 
                            else {
                                args.shift();
                                baseURL += "q=" + args.join(' ');
                            }
                            //Append api key
                            baseURL += "&apiKey=" + apiKey;
                            return [4 /*yield*/, Utils.getRequest(baseURL)];
                        case 1:
                            res = _a.sent();
                            if (res.data.status !== 'ok' || res.data.totalResults === 0) {
                                return [2 /*return*/, message.channel.send('Failed to fetch articles. Try broadening your search.\n\nCommand options:\n' +
                                        ("1. `" + botUtils.getBotConfig().prefix + "news` returns top Canadian headlines\n") +
                                        ("2. `" + botUtils.getBotConfig().prefix + "news <ISO 3166-1 country code>` returns top headlines for specified country\n") +
                                        ("3. `" + botUtils.getBotConfig().prefix + "news <search query>` returns top headlines related to the search query\n") +
                                        ("4. `" + botUtils.getBotConfig().prefix + "news <ISO 3166-1 country code> <search query>` returns top headlines related to the search query for specified country\n") +
                                        'Country codes: ```\n' + countryCodes + '```')];
                            }
                            articles_1 = [];
                            res.data.articles.forEach(function (article) {
                                var embed = botUtils.constructEmbed();
                                embed.setImage(article.urlToImage);
                                embed.setAuthor(article.source.name + '🔸' + (article.author ? "By " + article.author : ''));
                                embed.setTitle(article.title);
                                embed.setDescription("Published " + article.publishedAt);
                                embed.addField("Description", article.description || 'No description provided');
                                embed.addField("Content", article.content || 'No content provided');
                                embed.addField("Link", article.url || 'No link provided');
                                articles_1.push(embed);
                            });
                            botUtils.paginate(message, articles_1, 5);
                            resolve();
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            reject(err_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.desc = 'Retrieves news';
