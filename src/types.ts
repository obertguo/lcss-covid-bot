import Discord = require('discord.js');
import BotUtils = require('./utils/BotUtils');

export interface IBotConfig{
    prefix: string,
    embedColor: string
}

export interface IDiscordServerConfig{
    serverID: string
    execUsers: string[],
    modRoleID: string,

    lockdown: {
        status: boolean,    
        incomingUserRole: string
    },

    covid: {
        dailyIncrease:{
            channels: {
                london: string,
                ontario: string
            },
            appendedTextDescription: {
                london: string,
                ontario: string
            }
        },
        totalCases:{
            channels: {
                london: string,
                ontario: string
            },
            appendedTextDescription: {
                london: string,
                ontario: string
            }
        }
    }
}

export interface ICovidStats{
    ontario:{
        totalCases: number
        dailyIncrease: number
    },
    london:{
        totalCases: number
        dailyIncrease: number
    },
    retrievedTimestamp: number
}

export interface IBotCommand{
    exec: (message: Discord.Message, args?: string[], botUtils?: BotUtils) => Promise<void>
    category: string,
    name: string,
    description: string
}

export interface IOntarioCovidData{
    date: string,
    dailyIncrease: number
}