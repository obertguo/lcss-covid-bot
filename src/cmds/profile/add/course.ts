import Discord = require('discord.js');
import Utils = require('../../../utils/GeneralUtils');
export = async(message: Discord.Message, value: string): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            await Utils.executeDBQuery('INSERT INTO `userhighschool` (userID, course, teacher, semester) VALUES (?, ?, ?, ?)', 
            [message.author.id, value.split(',')[0] || null, value.split(',')[1] || null, value.split(',')[2] || null]);
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}