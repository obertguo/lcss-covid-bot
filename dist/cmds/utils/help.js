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
exports.exec = function (message, args, botUtils) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                try {
                    var categories_1 = new Set();
                    botUtils.getCommandsMap().forEach(function (cmd) { return categories_1.add(cmd.category); });
                    var helpCategorySpecified_1 = args[1];
                    var embed = botUtils.constructEmbed();
                    embed.setThumbnail(message.client.user.avatarURL());
                    //if no category specified/invalid category, send generic help
                    if (!categories_1.has(helpCategorySpecified_1)) {
                        var categoryList_1 = '';
                        categories_1.forEach(function (category) {
                            categoryList_1 += "\uD83D\uDD37 " + category + "\n";
                        });
                        embed.setTitle('Covid Bot Help');
                        embed.addField('Viewing Commands', "Use `" + botUtils.getBotConfig().prefix + "help {category}` to view a list of commands. E.g., `" + botUtils.getBotConfig().prefix + categories_1.values().next().value + "`");
                        embed.addField('Available Categories', '```\n' + categoryList_1 + '```');
                    }
                    //if category is specified, filter out commands in that category
                    else {
                        var commands_1 = [];
                        botUtils.getCommandsMap().forEach(function (cmd) {
                            if (cmd.category === helpCategorySpecified_1)
                                commands_1.push(cmd);
                        });
                        var commandList_1 = '';
                        commands_1.forEach(function (cmd) {
                            commandList_1 += "`\uD83D\uDD37" + botUtils.getBotConfig().prefix + cmd.name + "`\n> " + cmd.description + "\n";
                        });
                        var titleCaseCategory = helpCategorySpecified_1[0].toUpperCase() + helpCategorySpecified_1.substr(1);
                        embed.setTitle(titleCaseCategory + ' Commands');
                        embed.setDescription(commandList_1);
                    }
                    message.channel.send(embed);
                    resolve();
                    // if (categories.indexOf(args[1]) === -1) return message.channel.send({ embed: helpEmbeds.genericHelp(message.client, categories) });
                    // const pages = helpEmbeds.categoryHelp(message, message.client, args);
                    // message.client.paginate(message, pages, 2);
                }
                catch (err) {
                    reject(err);
                }
            })];
    });
}); };
exports.desc = 'Displays bot commands';
