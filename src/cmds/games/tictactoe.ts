import Discord = require('discord.js');
import BotUtils = require('../../utils/BotUtils');

exports.exec = (message: Discord.Message, args: string[], botUtils: BotUtils): Promise<void> =>{
    return new Promise(async (resolve, reject) =>{
        try{
            if(!message.mentions.users.first() || message.mentions.users.first() === message.author || message.mentions.users.first().bot){
                return message.channel.send(`Please ping another player to play!`);
            }

            const player1 = message.author;
            const player2 = message.mentions.users.first();

            const filter = (reaction: Discord.MessageReaction, user: Discord.User) => {
                return reaction.emoji.name === '✅'&& user.id === player2.id;
            }
                
            const msg = await message.channel.send(`Waiting for the user to react with ✅ when they are ready...They have 30 seconds`);
            await msg.react('✅');
            await msg.awaitReactions(filter, {time: 30 * 1000, max: 1, errors: ['time']});
            await msg.reactions.removeAll().catch(() =>{});

            //Game start
            let playerTurn = 0;
            let players = [player1, player2];
            let counters = ['❌', '🟠'];
            let board: string[] = [];
            let winner: string = null;
            let moves = 0;

            const gameFilter = (msg: Discord.Message) => {
                try{
                    //check if board contains an emoji number equal to the one user typed in (if so, then the spot is free) 
                    //also check if its the player's turn
                    return board[Number.parseInt(msg.content) - 1].includes(numMap[Number.parseInt(msg.content)]) && msg.author.id === players[playerTurn].id;
                }
                catch{}
            }

            const numMap = {
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }
            
            //Initialize board
            for(let i = 0; i < 9; ++i){
                board[i] = numMap[i + 1];
            }
            
            while(!winner){
                msg.edit(`Turn: <@${players[playerTurn].id}> ${counters[playerTurn]}\nThey have 30 seconds to respond. Type the number directly into the chat! E.g., \`1\`\n${printBoard(board)}`);

                //collect user response
                const collected = await message.channel.awaitMessages(gameFilter, {time: 30 * 1000, max: 1, errors: ['time']});
                await collected.first().delete().catch(() =>{});
                
                board[Number.parseInt(collected.first().content) - 1] = counters[playerTurn];
                
                //Check if there is a match
                //Horizontal
                for(let i = 0; i < 3; ++i){
                    if(board[i] === board[i + 3] && board[i] === board[i+6]) winner = `<@${players[playerTurn].id}>`;
                }

                //Vertical
                for(let i = 0; i <= 6; i += 3){
                    if(board[i] === board[i + 1] && board[i] === board[i+2]) winner = `<@${players[playerTurn].id}>`;
                }

                //Diagonal
                if(board[0] === board[4] && board[0] === board[8]) winner = `<@${players[playerTurn].id}>`;
                if(board[2] === board[4] && board[2] === board[6]) winner = `<@${players[playerTurn].id}>`;

                //If no match, and no winner after 9 moves, game is over
                ++moves;
                if(moves === 9) winner = 'None';
                
                //swtich turns
                ++playerTurn;
                playerTurn %= 2;
            }

            msg.edit(`**Game Over**\nWinner: ${winner}\n${printBoard(board)}`);
            
            resolve();
        }
        catch(err){
            message.channel.send('Timed out');
        }
    });
}

const printBoard = (board: string[]): string =>{
    let result: string = '';
    for(let i = 0; i < 9; ++i){
        result += board[i];
        if((i+1) % 3 === 0) result += '\n';
    }
    return result;
}

exports.desc = `Play a game of tictactoe with another player.`;