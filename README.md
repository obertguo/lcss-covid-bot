# lcss-covid-bot
## Getting Started
* A Node JS environment is required 
* Entry point is index.js, so `node .` or `node index.js` will begin the code execution

## Notes
* A .env file is required inside the project's root directory as to store the discord bot's token. `TOKEN=BotTokenHere`.
* Google Chrome v87.xx is required for selenium webdriver to work (this corresponds with the chromedriver version used in ./utils). You can replace the chromedriver with a different version, and use a version of Chrome that corresponds accordingly

## Tests
* There are two designated test scripts — `npm run london` and `npm run ontario` 
* These begin the scraping execution and report back the data that is retrieved

## Dependencies 
* [Chromedriver](https://chromedriver.chromium.org/downloads) (v87 is included in `./utils`)
* The following NPM dependencies 
```
"dependencies": {
    "axios": "^0.21.0",
    "cheerio": "^1.0.0-rc.3",
    "chromedriver": "^86.0.0",
    "discord.js": "^12.4.1",
    "dotenv": "^8.2.0",
    "mathjs": "^8.1.0",
    "nekos.life": "^2.0.7",
    "selenium-webdriver": "^4.0.0-alpha.7"
  }
```



