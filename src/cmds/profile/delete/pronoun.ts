import Discord = require('discord.js');
import Utils = require('../../../utils/GeneralUtils');
export = async(message: Discord.Message, value: string): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            if(!value) reject(`Pronoun must be specified`);
            await Utils.executeDBQuery('DELETE FROM `userpronouns` WHERE (userID = ? AND pronoun = ?)', 
            [message.author.id, value]);
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}