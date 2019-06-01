exports.run = (client, message, args, ops) => {
    if (message.author.id !== ops.ownerID)
        return message.channel.send('Quien sos vos para darme ordenes');

    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (e) {
        return message.channel.send(`No se pudo con esta mierda: ${args[0]}`);
    }

    message.channel.send(`Simon, listo perro`);
}
module.exports.help = {
    name: 'reload',
    aliases: ['r']
};