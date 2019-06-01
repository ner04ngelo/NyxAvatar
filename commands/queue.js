
exports.run = async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if (!fetched) return message.channel.send("No hay nada en la cola");

    let queue = fetched.queue;
    let nowPlaying = queue[0];

    let resp = `__**Rola:** __\n **${nowPlaying.songTitle}** 
                **Pedido por: ${nowPlaying.requester}**\n\n Rolas \n`;


    for (var i = 1; i < queue.length; i++) {
        resp += `${i}. **${queue[i].songTitle}** / **Pedido por: *${queue[i].requester}*\n`;

    }

    message.channel.send(resp);
}
module.exports.help = {
    name: 'queue',
    aliases: ['q']
};