const config = require('../config.json');
exports.run = (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);


    if(!fetched)return message.channel.send("No hay rolas sonando prix!");

    if(message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("Lo siento perro pero no estamosa en el mismo canal de voz");

    if(fetched.dispatcher.paused) return message.channel.send("Ya está pausada la rola");

    fetched.dispatcher.pause();

    message.react(config.emojiPause);

}

module.exports.help = {
    name: 'pause',
    aliases: ['w']
};