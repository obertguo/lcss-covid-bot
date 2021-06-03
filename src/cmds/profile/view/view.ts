import Discord = require('discord.js');
import BotUtils = require('../../../utils/BotUtils');
import Utils = require('../../../utils/GeneralUtils');
export = async(id: string, botUtils: BotUtils): Promise<Discord.MessageEmbed> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            const user = await Utils.executeDBQuery('SELECT * FROM `users` WHERE `userID` = ?', [id]);
            if(Object.keys(user).length === 0) reject("The user doesn't have a profile yet. Run `" + botUtils.getBotConfig().prefix + "profile` to be added to the DB");

            const userDescription: string = (await Utils.executeDBQuery('SELECT `userDescription` FROM `users` WHERE `userID` = ?', [id]))[0].userDescription || 'None';
            const userEducation: string = (await Utils.executeDBQuery('SELECT `userCurrentEducation` FROM `users` WHERE `userID` = ?', [id]))[0].userCurrentEducation || 'None';
            const userGrade: string = (await Utils.executeDBQuery('SELECT `userGrade` FROM `users` WHERE `userID` = ?', [id]))[0].userGrade || 'None';

            const courses = await Utils.executeDBQuery('SELECT * FROM `userhighschool` WHERE `userID` = ?', [id]);
            const coursesKeys: string[] = Object.keys(courses);

            const pronouns = await Utils.executeDBQuery('SELECT * FROM `userPronouns` WHERE `userID` = ?', [id]);
            const pronounsKeys: string[] = Object.keys(pronouns);

            const universities = await await Utils.executeDBQuery('SELECT * FROM `useruniversity` WHERE `userID` = ?', [id]);
            const universitiesKeys = Object.keys(universities);

            const programs = await await Utils.executeDBQuery('SELECT * FROM `useruniversityprograms` WHERE `userID` = ?', [id]);
            const programsKeys = Object.keys(programs);

            let courseDesc = '';
            coursesKeys.forEach(key => {
                courseDesc += '**' + courses[key].course + '**' + 
                ' Semester: ' + (courses[key].semester || 'None') + 
                ' Teacher: ' + (courses[key].teacher || 'None') + '\n'
            });

            let pronounsDesc = '';
            pronounsKeys.forEach(key => {
                pronounsDesc += pronouns[key].pronoun + '\n';
            });

            let universityDesc = '';
            universitiesKeys.forEach(key =>{
                universityDesc += universities[key].major + '\n';
            });

            let programStatusEmojisMap = {
                'pending': '⏰',
                'thinking': '💭',
                'accepted': '✅',
                'rejected': '❌'
            }

            let programsDesc = '';
            programsKeys.forEach(key =>{
                programsDesc += programs[key].program + ' ' + programStatusEmojisMap[programs[key].programStatus.toLowerCase()] + ` [${programs[key].programStatus.toUpperCase()}]` + '\n';
            });

            const embed = botUtils.constructEmbed();
            embed.setTitle(botUtils.getClient().users.cache.get(id).username + "'s Profile");
            embed.setThumbnail(botUtils.getClient().users.cache.get(id).avatarURL());
            embed.addField(`Description`, userDescription);
            embed.addField(`Pronouns`, pronounsDesc || 'None');
            embed.addField(`Current Education`, userEducation[0].toUpperCase() + userEducation.substr(1));
            embed.addField(`Current Grade`, userGrade);
            embed.addField(`Courses`, courseDesc || 'None');
            embed.addField(`University/Major Plans`, universityDesc || 'None');
            embed.addField(`Programs`, programsDesc || 'None');

            resolve(embed);
        }
        catch(err){
            reject(err);
        }
    });
}