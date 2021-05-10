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
var NekoClient = require("nekos.life");
var Utils = require("../../../utils/GeneralUtils");
var nekoLifeUtils = /** @class */ (function () {
    function nekoLifeUtils(command, message, botUtils) {
        this._command = command;
        this._message = message;
        this._botUtils = botUtils;
        this._nekoClient = new NekoClient();
    }
    nekoLifeUtils.prototype.retrieveUrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._nekoClient.sfw[this._command]()];
                    case 1:
                        img = _a.sent();
                        return [2 /*return*/, img.url];
                }
            });
        });
    };
    nekoLifeUtils.prototype.constructMessage = function () {
        var mentions = this._message.mentions.members.map(function (member) { return member.displayName; });
        var msg = '';
        //User only mentions themself
        if (mentions.length === 1 && mentions[0] === this._message.member.displayName) {
            switch (this._command) {
                case 'baka':
                    msg = "You are the baka, you **BAKA!**";
                    break;
                case 'feed':
                    msg = "Yum, nothing beats eating good food!";
                    break;
                case 'cuddle':
                    msg = "Cuddling yourself is pretty depressing.";
                    break;
                case 'hug':
                    msg = "Consider buying a body pillow, if you want to hug.";
                    break;
                case 'kiss':
                    msg = "How does one kiss themselves? \uD83E\uDD14";
                    break;
                case 'pat':
                    msg = "You derseve a good pat on the back.";
                    break;
                case 'poke':
                    msg = "Poke poke";
                    break;
                case 'slap':
                    msg = "Great way to remind yourself how much of a failure you are.";
                    break;
                case 'smug':
                    msg = "*Smugs inconspicuously*";
                    break;
                case 'tickle':
                    msg = "You must be ticklish if you can tickle yourself";
                    break;
            }
        }
        //User mentions 1 other
        else if (mentions.length === 1) {
            msg = "**" + this._message.member.displayName;
            switch (this._command) {
                case 'baka':
                    msg += "thinks that **" + mentions[0] + "** is a **HUGE BAKA!**";
                    break;
                case 'feed':
                    msg += "feeds **" + mentions[0] + "** something presumably edible.";
                    break;
                case 'cuddle':
                    msg += "cuddles **" + mentions[0] + "**! UwU.";
                    break;
                case 'hug':
                    msg += "hugs **" + mentions[0] + "**! How lewd...";
                    break;
                case 'kiss':
                    msg += "kisses **" + mentions[0] + "**! \uD83D\uDC40";
                    break;
                case 'pat':
                    msg += "gives **" + mentions[0] + "** a pat on the back.";
                    break;
                case 'poke':
                    msg += "is pestering **" + mentions[0] + "** and gives them a poke.";
                    break;
                case 'slap':
                    msg += "gives **" + mentions[0] + "** a SLAP!";
                    break;
                case 'smug':
                    msg += "casualy smugs at **" + mentions[0] + "**.";
                    break;
                case 'tickle':
                    msg += "tickles **" + mentions[0] + "** to oblivion.";
                    break;
            }
        }
        //User mentions 1+ other
        else if (mentions.length > 1) {
            msg = "**" + this._message.member.displayName;
            //For locale parsing in a list i.e., x, y, and z
            mentions[mentions.length - 1] = "and " + mentions[mentions.length - 1];
            switch (this._command) {
                case 'baka':
                    msg += "thinks that **" + mentions.join(', ') + "** are **HUGE BAKAS!**";
                    break;
                case 'feed':
                    msg += "feeds **" + mentions.join(', ') + "** something presumably edible.";
                    break;
                case 'cuddle':
                    msg += "cuddles **" + mentions.join(', ') + "**! UwU.";
                    break;
                case 'hug':
                    msg += "gives **" + mentions.join(', ') + "** a group hug!";
                    break;
                case 'kiss':
                    msg += "kisses **" + mentions.join(', ') + "**, giving everyone STDs! \uD83D\uDC40";
                    break;
                case 'pat':
                    msg += "gives **" + mentions.join(', ') + "** a pat on the back.";
                    break;
                case 'poke':
                    msg += "pokes **" + mentions.join(', ') + "**.";
                    break;
                case 'slap':
                    msg += "slaps **" + mentions.join(', ') + "** asses.";
                    break;
                case 'smug':
                    msg += "casualy smugs at **" + mentions.join(', ') + "** like a douche.";
                    break;
                case 'tickle':
                    msg += "tickles **" + mentions[0] + "** to oblivion";
                    break;
            }
        }
        return msg;
    };
    nekoLifeUtils.prototype.sendMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var embed, url, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        embed = this._botUtils.constructEmbed();
                        embed.setDescription(this.constructMessage());
                        return [4 /*yield*/, this.retrieveUrl()];
                    case 1:
                        url = _a.sent();
                        embed.setImage(url);
                        this._message.channel.send(embed);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        Utils.logError(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return nekoLifeUtils;
}());
module.exports = nekoLifeUtils;
