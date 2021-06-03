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
var webdriver = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");
var fs = require("fs");
var path = require("path");
var axios = require("axios");
var mysql = require("mysql2/promise");
require('dotenv').config({ path: '../static/.env' });
var chromedriverPath = path.join(__dirname, '../static/chromedriver.exe');
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.createHeadlessWebDriver = function () {
        var service = new chrome.ServiceBuilder(chromedriverPath).build();
        chrome.setDefaultService(service);
        return new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(new chrome.Options().headless()).build();
    };
    Utils.createWebDriver = function () {
        var service = new chrome.ServiceBuilder(chromedriverPath).build();
        chrome.setDefaultService(service);
        return new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    };
    Utils.readDirectory = function (path) {
        return fs.readdirSync(path);
    };
    Utils.stringifyJSON = function (data) {
        return JSON.stringify(data, null, 4);
    };
    Utils.writeJSON = function (path, data) {
        fs.writeFileSync(path, JSON.stringify(data, null, 4));
    };
    Utils.getRequest = function (url) {
        return new Promise(function (resolve, reject) {
            axios.default.get(url).then(function (result) {
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    Utils.parseInt = function (int) {
        return parseInt(int.split(',').join(''));
    };
    Utils.logInfo = function (message) {
        var FgBlue = '\x1b[34m';
        var Reset = '\x1b[0m';
        //If string, log msg
        if (typeof (message) === 'string')
            console.log(FgBlue + "\u2139\uFE0F[ INFO ]: " + Reset + message);
        //If not string (e.g., buffer), then don't concat with string, display data on new line 
        else {
            console.log(FgBlue + "\u2139\uFE0F[ INFO ]: " + Reset);
            console.log(message);
        }
    };
    Utils.logWarning = function (message) {
        var FgYellow = '\x1b[33m';
        var Reset = '\x1b[0m';
        //If string, log msg
        if (typeof (message) === 'string')
            console.log(FgYellow + "\u26A0\uFE0F[ WARNING ]: " + Reset + message);
        //If not string (e.g., buffer), then don't concat with string, display data on new line 
        else {
            console.log(FgYellow + "\u26A0\uFE0F[ WARNING ]: " + Reset);
            console.log(message);
        }
    };
    Utils.logError = function (message) {
        var FgRed = '\x1b[31m';
        var Reset = '\x1b[0m';
        //If string, log msg
        if (typeof (message) === 'string')
            console.log(FgRed + "\u26D4[ ERROR ]: " + Reset + message);
        //If not string (e.g., buffer), then don't concat with string, display data on new line 
        else {
            console.log(FgRed + "\u26D4[ ERROR ]: " + Reset);
            console.log(message);
        }
    };
    Utils.readFile = function (path) {
        return new Promise(function (resolve, reject) {
            fs.readFile(path, 'utf8', function (err, data) {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    };
    Utils.createDBConnection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, mysql.createConnection({
                                host: process.env.DBHOST,
                                port: Number.parseInt(process.env.DBPORT),
                                user: process.env.DBUSER,
                                password: process.env.DBPASSWORD,
                                database: process.env.DBNAME
                            })];
                    case 1:
                        connection = _a.sent();
                        this.logInfo("Connected to DB. ID:" + connection.threadId);
                        this.mySQLConnection = connection;
                        resolve();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        reject("DB connection failed\n" + err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Utils.executeDBQuery = function (query, values) {
        var _this = this;
        //TODO, escape input using connection.escape(input)
        //TODO, include placeholders
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a, records, fields, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.mySQLConnection)
                            reject('A connection to the DB has not been established');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.mySQLConnection.execute(query, values)];
                    case 2:
                        _a = _b.sent(), records = _a[0], fields = _a[1];
                        resolve(records);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _b.sent();
                        reject(err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Utils.closeDBConnection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.mySQLConnection) return [3 /*break*/, 1];
                        reject('A connection to the DB has not been established');
                        return [3 /*break*/, 5];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.mySQLConnection.end()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        //connection should close regardless of error
                        this.logWarning(err_3);
                        return [3 /*break*/, 4];
                    case 4:
                        this.logInfo("DB connection closed");
                        this.mySQLConnection = null;
                        resolve();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    Utils.getOne = function () {
    };
    Utils.mySQLConnection = null;
    return Utils;
}());
module.exports = Utils;
