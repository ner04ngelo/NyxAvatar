const ytdl = require('ytdl-core');
const search = require("yt-search");
let URL;

exports.run = async (client, message, args, ops) => {
    const song = args;


    if (!message.member.voice.channel) return message.channel.send('Debes de estar en un chat de voz');

    //if (!args[0]) return message.channel.send('Por favor ingrese una URL para el comando');

    let validate = await ytdl.validateURL(song[0]);

    if (!validate) {
        searchSong(song, client, ops, message, PlaySong);
    }else{
        PlaySong(song[0], client, ops, message);
    }

}

async function PlaySong(Songurl, client, ops, message) {
    let info = await ytdl.getInfo(Songurl);

    let data = ops.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await message.member.voice.channel.join();

    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: Songurl,
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

        }, 60000);


    }


}

function searchSong(song, client, ops, message, callback) {
    search(song.join(' '), function (err, res) {
        if (err) return message.channel.send("Lo siento loco algo malo pasó");
        let videos = res.videos.slice(0, 10);
        URL = "https://www.youtube.com" + videos[0].url;


        callback(URL, client, ops, message);
    });


}


module.exports.help = {
    name: 'play',
    aliases: ['p']
};