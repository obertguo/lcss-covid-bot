const nekoClient = require('nekos.life'),
neko = new nekoClient();

module.exports = async (client, arg, phrase) =>{
    try{
        const img = await neko.sfw[arg]();

        if(!phrase) return client.embedBuilder().setImage(img.url);
        return client.embedBuilder().setImage(img.url).setDescription(phrase);
    }
    catch(err){
        console.error(err);
        return err;
    }
}