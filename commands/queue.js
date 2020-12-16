module.exports = {
    name: 'queue',
    description: 'Song queue',
    async execute(message, Discord, args, ytdl, queue) {

            if (queue.length == 0) {
                const QueueEmbed = new Discord.MessageEmbed()
                .setColor('7A54C5')
                .setDescription('Queue is empty.')
                message.channel.send(QueueEmbed)
                return
            } else {
                const QueueEmbed2 = new Discord.MessageEmbed()
                .setTitle('Queue')
                .setThumbnail('https://media.discordapp.net/attachments/788220046873985087/788407233133805628/tunes5.png')
                .setFooter(message.author.username, message.author.avatarURL())
                .setTimestamp()
                .setColor('7A54C5')
                var times = 2
                for (var i = 0; i < queue.length; i++) {
                    const song = await (await ytdl.getInfo(queue[i])).videoDetails
                    if (i == 0) {
                        QueueEmbed2.addField("Playing...", song.title, false)
                    } else {
                        QueueEmbed2.addField(times, song.title, false)
                        times++
                    }
                }
                message.channel.send(QueueEmbed2)
            }

        getServerPlaylist(args.slice(0).join(" "));

        function getServerPlaylist(playlist) {
    
            return playlist;
        }
    }
}