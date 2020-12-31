const Discord = require('discord.js');
const embedColor = '#ff7979';

module.exports = () =>{
    return new Discord.MessageEmbed().setColor(embedColor);
}