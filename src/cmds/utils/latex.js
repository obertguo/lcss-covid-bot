const axios = require('axios').default;
const url = 'http://latex2png.com/api/convert';

let data = {
    auth:{
            user:"guest",
            password:"guest"
        },
    latex: null,
    resolution:600,
    color:"ffffff"
}


exports.run = (message, args, client) =>{
    try{
        args.shift();
        const latex = args.join(' ');

        data.latex = latex;
        
        axios.post(url, data).then(res =>{
            if(res.data['result-code'] === 0) message.channel.send('http://latex2png.com' + res.data.url);
            else message.channel.send(`Error\n${res.data.result-message}`);
        }).catch(err =>{
            console.log(err);
        });

    }
    catch(err){
        message.channel.send(err);
        console.log(err);
    }
}

exports.desc = "Send Latex as img in chat"
