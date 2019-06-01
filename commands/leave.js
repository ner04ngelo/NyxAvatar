exports.run = (client, message, args, ops) => {

    if (!message.guild.me.voice.channel) return message.channel.send('Que más querés, que me vaya del servidor');


    message.member.voice.channel.leave();
    ops.active.clear();
    message.channel.send('Me jalo pues hp....ya que no me queres');

}
module.exports.help = {
    name: 'leave',
    aliases: ['l']
};