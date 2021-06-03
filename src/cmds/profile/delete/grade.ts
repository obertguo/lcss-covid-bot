import Discord = require('discord.js');
import Utils = require('../../../utils/GeneralUtils');
export = async(message: Discord.Message, value: string): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            await Utils.executeDBQuery('UPDATE `users` SET `userGrade` = ? WHERE `userID` = ?', [null, message.author.id]);
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}