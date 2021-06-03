import Discord = require('discord.js');
import Utils = require('../../../utils/GeneralUtils');
export = async(message: Discord.Message, value: string): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            await Utils.executeDBQuery('UPDATE `users` SET `userCurrentEducation` = ? WHERE `userID` = ?', [value.toLowerCase(), message.author.id]);
            resolve();
        }
        catch(err){
            reject(err + '\nEducation must either be: `elementary | secondary | post secondary`');
        }
    });
}