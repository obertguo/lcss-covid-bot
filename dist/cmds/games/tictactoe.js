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
exports.exec = function (message, args, botUtils) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var player1, player2_1, filter, msg, playerTurn_1, players_1, counters, board_1, winner, moves, gameFilter, numMap_1, i, collected, i, i, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    if (!message.mentions.users.first() || message.mentions.users.first() === message.author || message.mentions.users.first().bot) {
                        return [2 /*return*/, message.channel.send("Please ping another player to play!")];
                    }
                    player1 = message.author;
                    player2_1 = message.mentions.users.first();
                    filter = function (reaction, user) {
                        return reaction.emoji.name === '✅' && user.id === player2_1.id;
                    };
                    return [4 /*yield*/, message.channel.send("Waiting for the user to react with \u2705 when they are ready...They have 30 seconds")];
                case 1:
                    msg = _a.sent();
                    return [4 /*yield*/, msg.react('✅')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, msg.awaitReactions(filter, { time: 30 * 1000, max: 1, errors: ['time'] })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, msg.reactions.removeAll().catch(function () { })];
                case 4:
                    _a.sent();
                    playerTurn_1 = 0;
                    players_1 = [player1, player2_1];
                    counters = ['❌', '🟠'];
                    board_1 = [];
                    winner = null;
                    moves = 0;
                    gameFilter = function (msg) {
                        try {
                            //check if board contains an emoji number equal to the one user typed in (if so, then the spot is free) 
                            //also check if its the player's turn
                            return board_1[Number.parseInt(msg.content) - 1].includes(numMap_1[Number.parseInt(msg.content)]) && msg.author.id === players_1[playerTurn_1].id;
                        }
                        catch (_a) { }
                    };
                    numMap_1 = {
                        1: '1️⃣',
                        2: '2️⃣',
                        3: '3️⃣',
                        4: '4️⃣',
                        5: '5️⃣',
                        6: '6️⃣',
                        7: '7️⃣',
                        8: '8️⃣',
                        9: '9️⃣',
                    };
                    //Initialize board
                    for (i = 0; i < 9; ++i) {
                        board_1[i] = numMap_1[i + 1];
                    }
                    _a.label = 5;
                case 5:
                    if (!!winner) return [3 /*break*/, 8];
                    msg.edit("Turn: <@" + players_1[playerTurn_1].id + "> " + counters[playerTurn_1] + "\nThey have 30 seconds to respond. Type the number directly into the chat! E.g., `1`\n" + printBoard(board_1));
                    return [4 /*yield*/, message.channel.awaitMessages(gameFilter, { time: 30 * 1000, max: 1, errors: ['time'] })];
                case 6:
                    collected = _a.sent();
                    return [4 /*yield*/, collected.first().delete().catch(function () { })];
                case 7:
                    _a.sent();
                    board_1[Number.parseInt(collected.first().content) - 1] = counters[playerTurn_1];
                    //Check if there is a match
                    //Horizontal
                    for (i = 0; i < 3; ++i) {
                        if (board_1[i] === board_1[i + 3] && board_1[i] === board_1[i + 6])
                            winner = "<@" + players_1[playerTurn_1].id + ">";
                    }
                    //Vertical
                    for (i = 0; i <= 6; i += 3) {
                        if (board_1[i] === board_1[i + 1] && board_1[i] === board_1[i + 2])
                            winner = "<@" + players_1[playerTurn_1].id + ">";
                    }
                    //Diagonal
                    if (board_1[0] === board_1[4] && board_1[0] === board_1[8])
                        winner = "<@" + players_1[playerTurn_1].id + ">";
                    if (board_1[2] === board_1[4] && board_1[2] === board_1[6])
                        winner = "<@" + players_1[playerTurn_1].id + ">";
                    //If no match, and no winner after 9 moves, game is over
                    ++moves;
                    if (moves === 9)
                        winner = 'None';
                    //swtich turns
                    ++playerTurn_1;
                    playerTurn_1 %= 2;
                    return [3 /*break*/, 5];
                case 8:
                    msg.edit("**Game Over**\nWinner: " + winner + "\n" + printBoard(board_1));
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _a.sent();
                    message.channel.send('Timed out');
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
};
var printBoard = function (board) {
    var result = '';
    for (var i = 0; i < 9; ++i) {
        result += board[i];
        if ((i + 1) % 3 === 0)
            result += '\n';
    }
    return result;
};
exports.desc = "Play a game of tictactoe with another player.";
