module.exports = {
    name: 'queue',
    description: 'Song queue',
    async execute(message, Discord, args, ytdl, queue) {

            if (queue.length == 0) {
                const queueEmbed = new Discord.MessageEmbed()
                .setColor('7A54C5')
                .setDescription('Queue is empty...')
                message.channel.send(queueEmbed)
            } else {
                const QueueEmbed = new Discord.MessageEmbed()
                .setTitle('Queue')
                .setTimestamp()
                //QueueEmbed.setFooter('', '');
                .setAuthor(message.author.username, message.author.avatarURL())
                .setColor('7A54C5')
                var times = 1
                for (var i = 0; i < queue.length; i++) {
                    const song = await (await ytdl.getInfo(queue[i])).videoDetails
                    if (i == 0) {
                        QueueEmbed.addField("Playing...", song.title, false)
                    } else {
                        QueueEmbed.addField(times, song.title, false)
                        times++
                    }
                }
                message.channel.send(QueueEmbed)
            }

        getServerPlaylist(args.slice(0).join(" "));

        function getServerPlaylist(playlist) {
    
            return playlist;
        }
    }
}