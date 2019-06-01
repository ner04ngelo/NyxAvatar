exports.run = async (client, message, args) => {
   const m = await message.channel.send("Ping?");
    m.edit(`Tu lag es de: ${Date.now() - m.createdTimestamp} ms!`);
    
}

module.exports.help = {
    name: 'ping',
    aliases: ['pi']
};