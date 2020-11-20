const path = require('path');

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const createHeadlessDriver = () =>{
    const service = new chrome.ServiceBuilder(path.join(__dirname, 'chromedriver.exe')).build();
    chrome.setDefaultService(service);
    
    return driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(new chrome.Options().headless()).build();
}

const createDriver = () =>{
    const service = new chrome.ServiceBuilder(path.join(__dirname, 'chromedriver.exe')).build();
    chrome.setDefaultService(service);
    
    return driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
}

module.exports = createHeadlessDriver;
