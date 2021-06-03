import Discord = require('discord.js');
import Utils = require('../../../utils/GeneralUtils');
export = async(message: Discord.Message, value: string): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            await Utils.executeDBQuery('INSERT INTO `useruniversity` (userID, major) VALUES (?, ?)', 
            [message.author.id, value]);
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}