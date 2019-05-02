exports.run = (client, message, args) => {
    message.channel.send(`Tu lag es de: ${client.ws.ping} ms!`);
}