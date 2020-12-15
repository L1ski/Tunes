module.exports = {
    name: "skip",
    description: "Skips a song",
    async execute(message, Discord, ytdl, queue) {

        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor('7A54C5')
            .setDescription('You need to be in a voice channel.')
            message.channel.send(errorEmbed)
            return
        } else if (queue.length == 0 ) {
            const queueEmbed = new Discord.MessageEmbed()
            .setColor('7A54C5')
            .setDescription('Queue is empty.')
            message.channel.send(queueEmbed)
            return
        } else if (queue.length == 2 ) {
            const skipEmbed = new Discord.MessageEmbed()
            .setColor('7A54C5')
            .setDescription('Song skipped by **' + message.author.tag+ '**')
            message.channel.send(skipEmbed)
            queue.shift(queue[0])
            var connection = await voiceChannel.join()
            const dispatcher = connection.play(ytdl(queue[0]))
            dispatcher.on('finish', () => {
                queue.shift(queue[0])
                if (queue.length == 0) {
                    voiceChannel.leave()
                } else {
                    const dispatcher = connection.play(ytdl(queue[0]))
                }
            })
        }
    }
}