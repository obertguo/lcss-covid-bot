const nekoClient = require('nekos.life'),
neko = new nekoClient();

module.exports = async (client, arg) =>{
    try{
        const img = await neko.sfw[arg]();
        return client.embedBuilder().setImage(img.url);
    }
    catch(err){
        console.error(err);
        return err;
    }
}