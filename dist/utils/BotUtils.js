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
var Discord = require("discord.js");
var Utils = require("./GeneralUtils");
var BotUtils = /** @class */ (function () {
    function BotUtils(client, botConfig, discordServerConfig) {
        this._client = client;
        this._botConfig = botConfig;
        this._commands = new Map();
        this._discordServerConfig = discordServerConfig;
    }
    BotUtils.prototype.getCommandsMap = function () {
        return this._commands;
    };
    BotUtils.prototype.setCommand = function (command) {
        this._commands.set(command.name, command);
    };
    BotUtils.prototype.getBotConfig = function () {
        return this._botConfig;
    };
    BotUtils.prototype.getClient = function () {
        return this._client;
    };
    BotUtils.prototype.constructEmbed = function () {
        return new Discord.MessageEmbed().setColor(this._botConfig.embedColor);
    };
    BotUtils.prototype.getDiscordServerConfig = function () {
        return this._discordServerConfig;
    };
    BotUtils.prototype.paginate = function (message, pages, timeMin) {
        return __awaiter(this, void 0, void 0, function () {
            var currentPage_1, i, msg_1, filter, collector, manageReactionsPermissionWarningTriggered_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!(pages.length === 1)) return [3 /*break*/, 1];
                        message.channel.send(pages[0]);
                        return [3 /*break*/, 5];
                    case 1:
                        currentPage_1 = 0;
                        //set page numbers
                        for (i = 0; i < pages.length; ++i) {
                            pages[i].setFooter("Page " + (i + 1) + "/" + pages.length);
                        }
                        return [4 /*yield*/, message.channel.send(pages[currentPage_1])];
                    case 2:
                        msg_1 = _a.sent();
                        return [4 /*yield*/, msg_1.react('◀')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, msg_1.react('▶')];
                    case 4:
                        _a.sent();
                        filter = function (reaction, user) { return (reaction.emoji.name === '◀' || reaction.emoji.name === '▶') && user.id === message.author.id; };
                        collector = msg_1.createReactionCollector(filter, { time: timeMin * 1000 * 60 });
                        manageReactionsPermissionWarningTriggered_1 = false;
                        collector.on('collect', function (reaction) {
                            try {
                                reaction.users.remove(message.author.id).catch(function () {
                                    if (!manageReactionsPermissionWarningTriggered_1) {
                                        message.channel.send("Manage reactions permission is required to auto remove reactions.");
                                        manageReactionsPermissionWarningTriggered_1 = true;
                                    }
                                });
                                if (reaction.emoji.name === '◀') {
                                    if (currentPage_1 === 0)
                                        currentPage_1 = pages.length - 1;
                                    else
                                        currentPage_1--;
                                }
                                if (reaction.emoji.name === '▶') {
                                    if (currentPage_1 === pages.length - 1)
                                        currentPage_1 = 0;
                                    else
                                        currentPage_1++;
                                }
                                msg_1.edit(pages[currentPage_1]);
                            }
                            catch (err) {
                                Utils.logError(err);
                            }
                        });
                        collector.on('end', function () { return msg_1.edit(pages[currentPage_1].setFooter("\u26A0\uFE0F Pagination timeout. Please use the command again to view more pages")); });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        Utils.logError(err_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return BotUtils;
}());
module.exports = BotUtils;
