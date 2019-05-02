const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops) => {
    if (!message.member.voice.channel) return message.channel.send('Debes de estar en un chat de voz');

    if (!args[0]) return message.channel.send('Por favor ingrese una URL para el comando');

    let validate = await ytdl.validateURL(args[0]);

    if (!validate) return message.channel.send('Po favo ingresa a **valid** url siguiendo el comando ');

    let info = await ytdl.getInfo(args[0]);
    ops.active.clear();
    let data = ops.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await message.member.voice.channel.join();

    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if (!data.dispatcher) play(client, ops, data);
    else {
        message.channel.send({
            embed: {
                color: 3447003,
                description: `Rola agregada a mi cola: ${info.title}`,
                footer: {
                    text: `Pedido por: ${message.author.tag}`
                }
            }
        });
    }

    ops.active.set(message.guild.id, data);

    /*let info = await ytdl.getInfo(args[0]);

    let connection = await message.member.voiceChannel.join();

    let dispatcher = await connection.playStream(ytdl(args[0],{filter: 'audioonly'}));*/



}

async function play(client, ops, data) {
    client.channels.get(data.queue[0].announceChannel).send('Ahi va la rola');
    client.channels.get(data.queue[0].announceChannel).send({
        embed: {
            color: 3447003,
            description: `Rola: ${data.queue[0].songTitle}`,
            footer: {
                text: `Pedido por: ${data.queue[0].requester}`
            }
        }
    });

    try {
        data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { filter: 'audioonly' }));
        data.dispatcher.guildID = data.guildID;

        data.dispatcher.on('finish', function () {
            finish(client, ops, this);
        });
    } catch (error) {
        console.log(error);
    }




}

function finish(client, ops, dispatcher) {
    let fetched = ops.active.get(dispatcher.guildID)

    fetched.queue.shift();

    if (fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID, fetched);

        play(client, ops, fetched);
    } else {
        ops.active.delete(dispatcher.guildID);

        let vc = client.guilds.get(dispatcher.guildID).me.voice.channel;
        setTimeout(() => {
            if (vc) vc.leave();
        }, 120000);

        
    }


}
