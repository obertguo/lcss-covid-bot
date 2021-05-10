"use strict";
var webdriver = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");
var fs = require("fs");
var path = require("path");
var axios = require("axios");
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
        console.log(FgBlue + "\u2139\uFE0F[ INFO ]: " + Reset + message);
    };
    Utils.logWarning = function (message) {
        var FgYellow = '\x1b[33m';
        var Reset = '\x1b[0m';
        console.log(FgYellow + "\u26A0\uFE0F[ WARNING ]: " + Reset + message);
    };
    Utils.logError = function (message) {
        var FgRed = '\x1b[31m';
        var Reset = '\x1b[0m';
        console.log(FgRed + "\u26D4[ ERROR ]: " + Reset + message);
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
    return Utils;
}());
module.exports = Utils;
