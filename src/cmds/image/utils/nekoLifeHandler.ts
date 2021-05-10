import Discord = require('discord.js');
import BotUtils = require("../../../utils/BotUtils");
import NekoClient = require('nekos.life');
import Utils = require('../../../utils/GeneralUtils');

class nekoLifeUtils {
    private _command: string;
    private _message: Discord.Message;
    private _botUtils: BotUtils;
    private _nekoClient: NekoClient;

    public constructor(command: string, message: Discord.Message, botUtils: BotUtils){
        this._command = command;
        this._message = message;
        this._botUtils = botUtils;
        this._nekoClient = new NekoClient();
    }
    
    private async retrieveUrl(): Promise<string>{
        const img: NekoClient.NekoRequestResults = await this._nekoClient.sfw[this._command]();
        return img.url;
    }

    public async sendMessage(): Promise<void>{
        try{
            let embed = this._botUtils.constructEmbed();

            const url = await this.retrieveUrl();
            embed.setImage(url);
            
            this._message.channel.send(embed);
        }
        catch(err){
            Utils.logError(err);
        }
    }
}

export = nekoLifeUtils;