import Discord = require('discord.js');
import Types = require('../types');
import Utils = require('./GeneralUtils');

class BotUtils{
    private _client: Discord.Client;
    private _botConfig: Types.IBotConfig;
    private _commands: Map<string, Types.IBotCommand>;
    private _discordServerConfig: Types.IDiscordServerConfig;

    public constructor(client:Discord.Client, botConfig: Types.IBotConfig, discordServerConfig: Types.IDiscordServerConfig){
        this._client = client;
        this._botConfig = botConfig;
        this._commands = new Map<string, Types.IBotCommand>();
        this._discordServerConfig = discordServerConfig;
    }

    public getCommandsMap(): Map<string, Types.IBotCommand> {
        return this._commands;
    }

    public setCommand(command: Types.IBotCommand): void{
        this._commands.set(command.name, command);
    }

    public getBotConfig(): Types.IBotConfig{
        return this._botConfig;
    }

    public getClient(): Discord.Client{
        return this._client;
    }

    public constructEmbed(): Discord.MessageEmbed{
        return new Discord.MessageEmbed().setColor(this._botConfig.embedColor);
    }

    public getDiscordServerConfig(): Types.IDiscordServerConfig{
        return this._discordServerConfig;
    }

    public async paginate(message: Discord.Message, pages: Discord.MessageEmbed[], timeMin: number): Promise<void>{
        try {
            if(pages.length === 1) message.channel.send(pages[0]);

            else{
                let currentPage: number = 0; //keep track of pages, let page be a zero based index to correspond with array 

                //set page numbers
                for(let i:number = 0; i < pages.length; ++i){
                    pages[i].setFooter(`Page ${i + 1}/${pages.length}`);
                }

                const msg = await message.channel.send(pages[currentPage]);
                
                await msg.react('◀');
                await msg.react('▶');

                const filter = (reaction, user) => (reaction.emoji.name === '◀' || reaction.emoji.name === '▶') && user.id === message.author.id;
                const collector = msg.createReactionCollector(filter, { time: timeMin * 1000 * 60 });

                let manageReactionsPermissionWarningTriggered = false;
                collector.on('collect', reaction => {
                    try{
                        reaction.users.remove(message.author.id).catch(() => {
                            if(!manageReactionsPermissionWarningTriggered){
                                message.channel.send(`Manage reactions permission is required to auto remove reactions.`);
                                manageReactionsPermissionWarningTriggered = true;
                            }
                        });
        
                        if (reaction.emoji.name === '◀') {
                            if(currentPage === 0) currentPage = pages.length - 1;
                            else currentPage--;
                        }
                        
                        if (reaction.emoji.name === '▶') {
                            if(currentPage === pages.length - 1) currentPage = 0;
                            else currentPage++;
                        }

                        msg.edit(pages[currentPage]);
                    }
                    catch(err){
                        Utils.logError(err);
                    }
                });
        
                collector.on('end', () => msg.edit(pages[currentPage].setFooter(`⚠️ Pagination timeout. Please use the command again to view more pages`)));
            }
        }
        catch(err){
            Utils.logError(err);
        }
    }
}

export = BotUtils;