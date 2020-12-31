const config = require('../config.json');

const guildMemberAdd = (member) =>{
   if (config.options.lockdown.status === false) return;

   member.roles.add(config.options.lockdown.role);
}

module.exports = guildMemberAdd;