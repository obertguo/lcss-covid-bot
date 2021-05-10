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
var WebDriver = require("selenium-webdriver");
var cheerio = require("cheerio");
var Utils = require("../GeneralUtils");
var Ontario = /** @class */ (function () {
    function Ontario(driver) {
        this.cases = null;
        this.increase = null;
        this.percentageIncrease = null;
        this.driver = null;
        this.driver = driver;
    }
    Ontario.prototype.getTotalCases = function () {
        return this.cases;
    };
    Ontario.prototype.getDailyIncrease = function () {
        return this.increase;
    };
    Ontario.prototype.getPercentageIncrease = function () {
        return this.percentageIncrease;
    };
    Ontario.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, document, $, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://www.ontario.ca/page/how-ontario-is-responding-covid-19';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 8]);
                        return [4 /*yield*/, this.driver.get(url)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.driver.wait(WebDriver.until.elementLocated(WebDriver.By.id('section-0')), 2000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.driver.getPageSource()];
                    case 4:
                        document = _a.sent();
                        $ = cheerio.load(document);
                        $ = cheerio.load($('.numeric.full-width')[0]);
                        //get 2nd table row (# of cases) and the then children w/ td tag, and the text of the first element of it
                        this.cases = Utils.parseInt($($('tr')[1]).children('td').first().text());
                        //get 3rd table row (# of increase) and the then children w/ td tag, and the text of the first element of it
                        this.increase = Utils.parseInt($($('tr')[2]).children('td').first().text());
                        //get 3rd table row (# of increase) and the then children w/ td tag, and the text of the last element of it
                        this.percentageIncrease = parseInt($($('tr')[2]).children('td').last().text());
                        return [3 /*break*/, 8];
                    case 5:
                        err_1 = _a.sent();
                        throw err_1;
                    case 6: return [4 /*yield*/, this.driver.quit()];
                    case 7:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Ontario;
}());
module.exports = Ontario;
