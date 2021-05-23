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

    private constructMessage(): string{
        const mentions: Array<string> = this._message.mentions.members.map(member => member.displayName);
        let msg = '';

        //User only mentions themself
        if(mentions.length === 1 && mentions[0] === this._message.member.displayName){
            switch(this._command){
                case 'baka':
                    msg = `You are the baka, you **BAKA!**`;
                    break;
                case 'feed': 
                    msg = `Yum, nothing beats eating good food!`;
                    break;
                case 'cuddle':
                    msg = `Cuddling yourself is pretty depressing.`;
                    break;
                case 'hug':
                    msg = `Consider buying a body pillow, if you want to hug.`
                    break;
                case 'kiss':
                    msg = `How does one kiss themselves? 🤔`;
                    break;
                case 'pat':
                    msg = `You derseve a good pat on the back.`;
                    break;
                case 'poke':
                    msg = `Poke poke`;
                    break;
                case 'slap':
                    msg = `Great way to remind yourself how much of a failure you are.`
                    break;
                case 'smug':
                    msg = `*Smugs inconspicuously*`;
                    break;
                case 'tickle':
                    msg = `You must be ticklish if you can tickle yourself`;
                    break;
            }
        }

        //User mentions 1 other
        else if(mentions.length === 1){
            msg = `**${this._message.member.displayName}`;
            switch(this._command){
                case 'baka':
                    msg += `thinks that **${mentions[0]}** is a **HUGE BAKA!**`;
                    break;
                case 'feed':
                    msg += `feeds **${mentions[0]}** something presumably edible.`;
                    break;
                case 'cuddle':
                    msg += `cuddles **${mentions[0]}**! UwU.`;
                    break;
                case 'hug':
                    msg += `hugs **${mentions[0]}**! How lewd...`;
                    break;
                case 'kiss':
                    msg += `kisses **${mentions[0]}**! 👀`;
                    break;
                case 'pat':
                    msg += `gives **${mentions[0]}** a pat on the back.`;
                    break;
                case 'poke':
                    msg += `is pestering **${mentions[0]}** and gives them a poke.`;
                    break;
                case 'slap':
                    msg += `gives **${mentions[0]}** a SLAP!`;
                    break;
                case 'smug':
                    msg += `casualy smugs at **${mentions[0]}**.`;
                    break;
                case 'tickle':
                    msg += `tickles **${mentions[0]}** to oblivion.`;
                    break;
            }
        }

        //User mentions 1+ other
        else if(mentions.length > 1){
            msg = `**${this._message.member.displayName}`;

            //For locale parsing in a list i.e., x, y, and z
            mentions[mentions.length - 1] = `and ${mentions[mentions.length - 1]}`;

            switch(this._command){
                case 'baka':
                    msg += `thinks that **${mentions.join(', ')}** are **HUGE BAKAS!**`;
                    break;
                case 'feed':
                    msg += `feeds **${mentions.join(', ')}** something presumably edible.`;
                    break;
                case 'cuddle':
                    msg += `cuddles **${mentions.join(', ')}**! UwU.`;
                    break;
                case 'hug':
                    msg += `gives **${mentions.join(', ')}** a group hug!`;
                    break;
                case 'kiss':
                    msg += `kisses **${mentions.join(', ')}**, giving everyone STDs! 👀`;
                    break;
                case 'pat':
                    msg += `gives **${mentions.join(', ')}** a pat on the back.`;
                    break;
                case 'poke':
                    msg += `pokes **${mentions.join(', ')}**.`;
                    break;
                case 'slap':
                    msg += `slaps **${mentions.join(', ')}** asses.`;
                    break;
                case 'smug':
                    msg += `casualy smugs at **${mentions.join(', ')}** like a douche.`;
                    break;
                case 'tickle':
                    msg += `tickles **${mentions[0]}** to oblivion`;
                    break;
            }
        }

        return msg;
    }

    public async sendMessage(): Promise<void>{
        try{
            let embed = this._botUtils.constructEmbed();
            embed.setDescription(this.constructMessage());

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