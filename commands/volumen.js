const config = require('../config.json');
exports.run = (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);


    if(!fetched)return message.channel.send("No hay rolas sonando prix!");

    if(message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("Lo siento perro pero no estamosa en el mismo canal de voz");

    if(isNaN(args[0]|| arg[0] > 200 || args[0] < 0)) return message.channel.send("Loco para esto solo son números!");

    fetched.dispatcher.setVolume(args[0]/100);

    message.react(config.emojiUp);

}
module.exports.help = {
    name: 'volumen',
    aliases: ['v']
};