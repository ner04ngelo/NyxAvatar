const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const Discord = require('discord.js');
const directoryPath = path.join(__dirname);
let mess;
var commands = [];
var alias = [];
var commandsDescription = [
    "El bot deja el chat de voz, cancelando la musica en reproducción",
    "Pausa la musica que se está reproduciendo",
    "Muestra el ping del usuario",
    "Reproduce una canción según el URL de YouTube proporcionado",
    "Muestra las canciones en la cola de reproducción",
    "Recarga un comando (Solo para el dueño del bot)",
    "Continua la reproducción de la canción actual",
    "Hace una busqueda en YouTube de las canciones",
    "Salta a la siguiente canción en la cola de reproducción",
    "Detiene la canción que se está reproduciendo actualmente",
    "Aumenta el volumen de la canción reproduciendose"
];

exports.run = (client, message, args, ops) => {
    commands.length = 0;
    mess = message;
    alias = ops.aliases;
    getFileNames(printCommands, ops);


}


function printCommands(ops) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Comandos de NyxAvatar")
        .setColor(3447003);

    for (let index = 0; index < commands.length; index++) {
        if (commands[index] == "|help") {
            commands.splice(index, 1);
            if (alias[index] == "h") { alias.splice(index, 1); }

        }

        embed.addField("Comando: " + commands[index]+"\nAlias: " + alias[index], commandsDescription[index])
    }
    mess.channel.send(embed);

}

function getFileNames(callback, ops) {

    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {

            var filename = path.basename(directoryPath + "/" + file, '.js');
            commands.push(config.prefix + filename);

        });
        callback(ops);
    });

}


module.exports.help = {
    name: 'help',
    aliases: ['h']
};