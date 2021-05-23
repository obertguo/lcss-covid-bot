import webdriver = require('selenium-webdriver');
import chrome = require('selenium-webdriver/chrome'); 
import fs = require('fs');
import path = require('path');
import axios = require('axios');
const chromedriverPath = path.join(__dirname, '../static/chromedriver.exe'); 

class Utils{
    public static createHeadlessWebDriver(): webdriver.ThenableWebDriver{
        const service = new chrome.ServiceBuilder(chromedriverPath).build();
        chrome.setDefaultService(service);

        return new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(new chrome.Options().headless()).build();
    }

    public static createWebDriver(): webdriver.ThenableWebDriver{
        const service = new chrome.ServiceBuilder(chromedriverPath).build();
        chrome.setDefaultService(service);
        
        return new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    }

    public static readDirectory(path: string): string[]{
        return fs.readdirSync(path);
    }

    public static stringifyJSON(data: object): string{
        return JSON.stringify(data, null, 4);
    }

    public static writeJSON(path: string, data: object): void{
        fs.writeFileSync(path, JSON.stringify(data, null, 4));
    }

    public static getRequest(url: string): Promise<axios.AxiosResponse>{
        return new Promise((resolve, reject) =>{
            axios.default.get(url).then(result => {
                resolve(result);
            }).catch(err =>{
                reject(err);
            });
        })
    }

    public static parseInt(int: string): number{
        return parseInt(int.split(',').join(''));
    }

    public static logInfo(message: string){
        const FgBlue = '\x1b[34m';
        const Reset = '\x1b[0m';
        console.log(`${FgBlue}ℹ️[ INFO ]: ${Reset}${message}`);
    }
    public static logWarning(message: string){
        const FgYellow = '\x1b[33m';
        const Reset = '\x1b[0m';
        console.log(`${FgYellow}⚠️[ WARNING ]: ${Reset}${message}`);
    }

    public static logError(message: string | Error){
        const FgRed = '\x1b[31m';
        const Reset = '\x1b[0m';
        console.log(`${FgRed}⛔[ ERROR ]: ${Reset}${message}`);
    }

    public static readFile(path: string): Promise<string>{
        return new Promise((resolve, reject) =>{
            fs.readFile(path, 'utf8', (err, data: string) =>{
                if(err) reject(err);
                else resolve(data);
            }); 
        });
    }
}

export = Utils;