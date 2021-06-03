"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = function (message) {
    return new Promise(function (resolve, reject) {
        try {
            message.guild.me.voice.channel.leave();
            message.guild.me.setNickname('');
            message.channel.send('Disconnected from VC');
        }
        catch (err) { }
    });
};
exports.desc = "Disconnect bot from VC";
