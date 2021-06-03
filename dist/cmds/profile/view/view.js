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
var Utils = require("../../../utils/GeneralUtils");
module.exports = function (id, botUtils) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var user, userDescription, userEducation, userGrade, courses_1, coursesKeys, pronouns_1, pronounsKeys, universities_1, universitiesKeys, programs_1, programsKeys, courseDesc_1, pronounsDesc_1, universityDesc_1, programStatusEmojisMap_1, programsDesc_1, embed, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 11, , 12]);
                            return [4 /*yield*/, Utils.executeDBQuery('SELECT * FROM `users` WHERE `userID` = ?', [id])];
                        case 1:
                            user = _a.sent();
                            if (Object.keys(user).length === 0)
                                reject("The user doesn't have a profile yet. Run `" + botUtils.getBotConfig().prefix + "profile` to be added to the DB");
                            return [4 /*yield*/, Utils.executeDBQuery('SELECT `userDescription` FROM `users` WHERE `userID` = ?', [id])];
                        case 2:
                            userDescription = (_a.sent())[0].userDescription || 'None';
                            return [4 /*yield*/, Utils.executeDBQuery('SELECT `userCurrentEducation` FROM `users` WHERE `userID` = ?', [id])];
                        case 3:
                            userEducation = (_a.sent())[0].userCurrentEducation || 'None';
                            return [4 /*yield*/, Utils.executeDBQuery('SELECT `userGrade` FROM `users` WHERE `userID` = ?', [id])];
                        case 4:
                            userGrade = (_a.sent())[0].userGrade || 'None';
                            return [4 /*yield*/, Utils.executeDBQuery('SELECT * FROM `userhighschool` WHERE `userID` = ?', [id])];
                        case 5:
                            courses_1 = _a.sent();
                            coursesKeys = Object.keys(courses_1);
                            return [4 /*yield*/, Utils.executeDBQuery('SELECT * FROM `userPronouns` WHERE `userID` = ?', [id])];
                        case 6:
                            pronouns_1 = _a.sent();
                            pronounsKeys = Object.keys(pronouns_1);
                            return [4 /*yield*/, Utils.executeDBQuery('SELECT * FROM `useruniversity` WHERE `userID` = ?', [id])];
                        case 7: return [4 /*yield*/, _a.sent()];
                        case 8:
                            universities_1 = _a.sent();
                            universitiesKeys = Object.keys(universities_1);
                            return [4 /*yield*/, Utils.executeDBQuery('SELECT * FROM `useruniversityprograms` WHERE `userID` = ?', [id])];
                        case 9: return [4 /*yield*/, _a.sent()];
                        case 10:
                            programs_1 = _a.sent();
                            programsKeys = Object.keys(programs_1);
                            courseDesc_1 = '';
                            coursesKeys.forEach(function (key) {
                                courseDesc_1 += '**' + courses_1[key].course + '**' +
                                    ' Semester: ' + (courses_1[key].semester || 'None') +
                                    ' Teacher: ' + (courses_1[key].teacher || 'None') + '\n';
                            });
                            pronounsDesc_1 = '';
                            pronounsKeys.forEach(function (key) {
                                pronounsDesc_1 += pronouns_1[key].pronoun + '\n';
                            });
                            universityDesc_1 = '';
                            universitiesKeys.forEach(function (key) {
                                universityDesc_1 += universities_1[key].major + '\n';
                            });
                            programStatusEmojisMap_1 = {
                                'pending': '⏰',
                                'thinking': '💭',
                                'accepted': '✅',
                                'rejected': '❌'
                            };
                            programsDesc_1 = '';
                            programsKeys.forEach(function (key) {
                                programsDesc_1 += programs_1[key].program + ' ' + programStatusEmojisMap_1[programs_1[key].programStatus.toLowerCase()] + (" [" + programs_1[key].programStatus.toUpperCase() + "]") + '\n';
                            });
                            embed = botUtils.constructEmbed();
                            embed.setTitle(botUtils.getClient().users.cache.get(id).username + "'s Profile");
                            embed.setThumbnail(botUtils.getClient().users.cache.get(id).avatarURL());
                            embed.addField("Description", userDescription);
                            embed.addField("Pronouns", pronounsDesc_1 || 'None');
                            embed.addField("Current Education", userEducation[0].toUpperCase() + userEducation.substr(1));
                            embed.addField("Current Grade", userGrade);
                            embed.addField("Courses", courseDesc_1 || 'None');
                            embed.addField("University/Major Plans", universityDesc_1 || 'None');
                            embed.addField("Programs", programsDesc_1 || 'None');
                            resolve(embed);
                            return [3 /*break*/, 12];
                        case 11:
                            err_1 = _a.sent();
                            reject(err_1);
                            return [3 /*break*/, 12];
                        case 12: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
