import Discord = require('discord.js');
import Utils = require('../../../utils/GeneralUtils');
export = async(message: Discord.Message, value: string): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            if(!value) reject(`Program name must be specified`);
            await Utils.executeDBQuery('DELETE FROM `useruniversityprograms` WHERE (userID = ? AND program = ?)', 
            [message.author.id, value]);
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}