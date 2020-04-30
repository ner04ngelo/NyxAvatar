const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
//const security = require('./security.json');

const prefix = config.prefix;
//const ownerID = security.IdOwner;
const ownerID = process.env.ownerID;
const active = new Map();
const fs = require("fs");
const aliases = [];

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) return console.log("There are no commands to load...");

    console.log(`Loading ${jsfiles.length} commands...`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
            aliases.push(alias);
        });
    });
});

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
    let command;

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    try {

        let ops = {
            ownerID: ownerID,
            active: active,
            aliases: aliases
        }
          
        if (client.commands.has(cmd)) {           
            let commanFile = require(`./commands/${cmd}.js`)
            commanFile.run(client, message, args, ops);
        } else {
            command = client.commands.get(client.aliases.get(cmd));
            let commanFile = require(`./commands/${command.help.name}.js`)
            commanFile.run(client, message, args, ops);
        }        
       
    } catch (e) {
        console.log(e.stack);
    }

});

client.login("NTcyNDY5OTU0MjQ3MzkzMzAy.Xqs8hA.S1OXfhTvf6yn0HLownlleZYGZ7U");
//client.login(security.token);