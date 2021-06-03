import Discord = require('discord.js');
import Utils = require('../../../utils/GeneralUtils');
export = async(message: Discord.Message, value: string): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            await Utils.executeDBQuery('INSERT INTO `useruniversityprograms` (userID, program, programStatus) VALUES (?, ?, ?)', 
            [message.author.id, value.split(',')[0], value.split(',')[1].trim().toLowerCase()]);
            resolve();
        }
        catch(err){
            reject(err + '\nPrograms must be `programName`, `programStatus` where programStatus is either `accepted | rejected | pending | thinking`');
        }
    });
}