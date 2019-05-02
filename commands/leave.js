exports.run = (client, message, args, ops) =>{
    if (!message.member.voice.channel) return message.channel.send('Mira loco como te explico esto, conectate a un hijoputa chat de voz');

    if(!message.guild.me.voice.channel) return message.channel.send('Que más querés, que me vaya del servidor');

    if(message.guild.me.voice.channel.channelID !== message.member.voice.channel.channelID) return message.channel.send('Negra pipe, tenes que estar aquí conmigo');

    message.member.voice.channel.leave();
    //ops.active.clear();
    message.channel.send('Me jalo pues hp....ya que no me queres');

}
