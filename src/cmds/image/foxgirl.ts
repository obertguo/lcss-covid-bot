import Discord = require('discord.js');
import BotUtils = require('../../utils/BotUtils');
import NekoLifeHandler = require('./utils/nekoLifeHandler');
const fileName = 'foxGirl';

exports.exec = (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            const nekoLifeHandler: NekoLifeHandler = new NekoLifeHandler(fileName, message, botUtils);
            await nekoLifeHandler.sendMessage();
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
    
}

exports.desc = `Sends a random fox girl picture.`;