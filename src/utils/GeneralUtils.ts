import webdriver = require('selenium-webdriver');
import chrome = require('selenium-webdriver/chrome'); 
import fs = require('fs');
import path = require('path');
import axios = require('axios');
import mysql = require('mysql2/promise');
require('dotenv').config({path: '../static/.env'});

const chromedriverPath = path.join(__dirname, '../static/chromedriver.exe'); 

class Utils{
    private static mySQLConnection: mysql.Connection = null;

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

    public static logInfo(message: string | any){
        const FgBlue = '\x1b[34m';
        const Reset = '\x1b[0m';

        //If string, log msg
        if(typeof(message) === 'string') console.log(`${FgBlue}ℹ️[ INFO ]: ${Reset}${message}`);

        //If not string (e.g., buffer), then don't concat with string, display data on new line 
        else {
            console.log(`${FgBlue}ℹ️[ INFO ]: ${Reset}`);
            console.log(message);
        }
    }
    public static logWarning(message: string){
        const FgYellow = '\x1b[33m';
        const Reset = '\x1b[0m';

        //If string, log msg
        if(typeof(message) === 'string') console.log(`${FgYellow}⚠️[ WARNING ]: ${Reset}${message}`);

        //If not string (e.g., buffer), then don't concat with string, display data on new line 
        else {
            console.log(`${FgYellow}⚠️[ WARNING ]: ${Reset}`);
            console.log(message);
        }
    }

    public static logError(message: string | Error){
        const FgRed = '\x1b[31m';
        const Reset = '\x1b[0m';

        //If string, log msg
        if(typeof(message) === 'string') console.log(`${FgRed}⛔[ ERROR ]: ${Reset}${message}`);

        //If not string (e.g., buffer), then don't concat with string, display data on new line 
        else {
            console.log(`${FgRed}⛔[ ERROR ]: ${Reset}`);
            console.log(message);
        }
    }

    public static readFile(path: string): Promise<string>{
        return new Promise((resolve, reject) =>{
            fs.readFile(path, 'utf8', (err, data: string) =>{
                if(err) reject(err);
                else resolve(data);
            }); 
        });
    }

    public static createDBConnection(): Promise<void> {
        return new Promise(async (resolve, reject) =>{
            try {
                const connection = await mysql.createConnection({
                    host: process.env.DBHOST,
                    port: Number.parseInt(process.env.DBPORT),
                    user: process.env.DBUSER,
                    password: process.env.DBPASSWORD,
                    database: process.env.DBNAME
                });

                this.logInfo(`Connected to DB. ID:` + connection.threadId);
                this.mySQLConnection = connection;
                resolve();
            }
            catch(err){
                reject(`DB connection failed\n` + err);
            }
        });
    }

    public static executeDBQuery(query: string, values: any[]): Promise<mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket | mysql.OkPacket[] | mysql.ResultSetHeader>
    {
        //TODO, escape input using connection.escape(input)
        //TODO, include placeholders
        return new Promise(async(resolve, reject) =>{
            if(!this.mySQLConnection) reject('A connection to the DB has not been established');
            try{    
                const [records, fields] = await this.mySQLConnection.execute(query, values);
                resolve(records);
            }
            catch(err){
                reject(err);
            }
        });
    }

    public static closeDBConnection(): Promise<void>{
        return new Promise(async (resolve, reject)=>{
            if(!this.mySQLConnection) reject('A connection to the DB has not been established');
            else{
                try{
                    await this.mySQLConnection.end();
                }
                catch(err){
                    //connection should close regardless of error
                    this.logWarning(err);
                }
    
                this.logInfo(`DB connection closed`);
                this.mySQLConnection = null;
                resolve();
            }
        });
    }

    public static getOne(){

    }
}

export = Utils;