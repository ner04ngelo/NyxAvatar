
exports.run = async (client, message, arg, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if(!fetched) return message.channel.send("No hay rolas");

    if(message.member.voice.channel !== message.guild.me.voice.channel)return message.channel.send("No estas en el canal de voz");

    let userCount = message.member.voice.channel.members.size;

    let required = Math.ceil(userCount/userCount);


    if(!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    fetched.queue[0].voteSkips.push(message.member.id);

    ops.active.set(message.guild.id, fetched);

    if(fetched.queue[0].voteSkips.length >= required){
        if(fetched.queue.length != 1){
            return fetched.dispatcher.emit('finish');
        }else{
            ops.active.clear();
            message.guild.me.voice.channel.leave();
        }
       
    }
}
module.exports.help = {
    name: 'skip',
    aliases: ['n']
};