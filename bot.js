const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const prefix = config.prefix;
//const ownerID = config.IdOwner;
const ownerID = process.env.ownerID;
const active = new Map();


client.on('error', error => {
    console.error('The WebSocket encountered an error:', error);
});

client.on("ready", () => {
    console.log("Estoy listo!");
    
    client.user.setActivity('|help', { type: 'PLAYING' });
 
 });

client.on('message', message => {
    ///Variables
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLocaleLowerCase();
   
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    try {

        delete require.cache[require.resolve(`./commands/${cmd}.js`)];
        
        let ops = {
            ownerID: ownerID,
            active: active
        }

        let commanFile = require(`./commands/${cmd}.js`)
        commanFile.run(client, message, args, ops);
    } catch (e) {
        console.log(e.stack);
    }

});

client.login(process.env.token);
//client.login(config.token);