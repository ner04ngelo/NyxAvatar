const search = require("yt-search");
const Discord = require('discord.js');

exports.run = (client, message, args, ops) => {
    search(args.join(' '), function (err, res) {
        if (err) return message.channel.send("Lo siento loco algo malo pasó");


        const embed = new Discord.MessageEmbed()
            .setTitle("Resultados")
            .setColor(3447003);

        let videos = res.videos.slice(0, 10);
       
        for (var i in videos) {
            embed.addField(`${parseInt(i) + 1}: ` + `${videos[i].title}`, `https://www.youtube.com${videos[i].url}`);
            
        }
        embed.setDescription("Elije el número de los videos para reproducir");

        message.channel.send(embed);

        const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;

        const collector = message.channel.createMessageCollector(filter);

        collector.videos = videos;

        collector.once('collect', function(m){
            let commandFile = require(`./play.js`);
            commandFile.run(client, message, [this.videos[parseInt(m.content-1)].url], ops);
            videos.length = 0;
        });

    });
}








module.exports.help = {
    name: 'search',
    aliases: ['s']
};