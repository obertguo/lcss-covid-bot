const { findSafariDriver } = require('selenium-webdriver/safari');
const json = require('../config.json');
const fs = require('fs');

json.options.autoUpdate = "asdf";

console.log(json);