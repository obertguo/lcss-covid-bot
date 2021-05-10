# lcss-covid-bot
## Getting Started
* A Node JS environment is required 
* Typescript source code is located in `./src` and a compiled JavaScript release is located in `./dist`
* In `./dist`, the entry point is `index.js`. `node .` or `node index.js` will start the bot. 

## Config
* A .env file is required inside the project's `static` directory as to store the discord bot's token. `TOKEN=BotTokenHere`.

* The bot is reliant on Google Chrome to scrape Covid data - make sure it is installed, and a chromedriver is present inside in the project's `static` directory. Make sure the chromedriver version corresponds to the installed Google Chrome version. 

* A bot config file is located inside the project's `static` directory, where a primary discord server settings, and the bot, can be configured.

## Dependencies 
* [Chromedriver](https://chromedriver.chromium.org/downloads) (v90.xx is included inside the `static` directory)
* The following NPM dependencies 
```
"dependencies": {
    "@types/cheerio": "^0.22.28",
    "@types/selenium-webdriver": "^4.0.12",
    "axios": "^0.21.1",
    "cheerio": "^1.0.0-rc.3",
    "discord.js": "^12.5.3",
    "dotenv": "^8.2.0",
    "nekos.life": "^2.0.7",
    "selenium-webdriver": "^4.0.0-beta.3"
  },
```



