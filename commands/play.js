module.exports = {
    name: 'play',
    description: 'Plays some music',
    execute(message, Discord, args, ytdl, opts, search, queue) {

        if (!message.member.voice.channel) {
            const ErrorEmbed = new Discord.MessageEmbed()
            .setColor('7A54C5')
            .setDescription('You need to be in a voice channel.')
            message.channel.send(ErrorEmbed)
        }

        function sendMusicEmbed(song) {
            const MusicEmbed = new Discord.MessageEmbed()
            .setColor('7A54C5')
            .setAuthor(song.videoDetails.author.name, song.videoDetails.author.thumbnails[0].url)
            .setTitle(song.videoDetails.title)
            .setThumbnail('https://media.discordapp.net/attachments/788220046873985087/788407233133805628/tunes5.png')
            .setURL(song.videoDetails.video_url)
            .setImage(song.videoDetails.thumbnail.thumbnails[1].url)
            .setTimestamp()
            .setFooter('Requested by ' + message.author.username, message.author.avatarURL())
            .addFields(
                { name: 'Views', value: song.videoDetails.viewCount.toLocaleString(), inline: true },
                { name: 'Likes', value: song.videoDetails.likes.toLocaleString(), inline: true },
                { name: 'Dislikes', value: song.videoDetails.dislikes.toLocaleString(), inline: true },
            )
            message.channel.send(MusicEmbed)
        }
        
        play(args.slice(0).join(" "))

        async function play(song) {
            const voiceChannel = message.member.voice.channel
            const connection = await voiceChannel.join();
            if (ytdl.validateURL(song)) {
                console.log(song);
                const songInfo = await (await ytdl.getInfo(song))
                sendMusicEmbed(songInfo)
                if (queue.length == 0) {
                    queue.push(song)
                    const dispatcher = connection.play(ytdl(song))
                    dispatcher.on('finish', () => {
                        queue.shift(song)
                        if (queue.length == 0) {
                            voiceChannel.leave()
                        } else {
                            connection.play(ytdl(queue[0]))
                        }
                    })
                } else {
                    const QueueEmbed = new Discord.MessageEmbed()
                    .setColor('7A54C5')
                    .setDescription('Song Queued.')
                    message.channel.send(QueueEmbed)
                    queue.push(song)
                }
            } else {
                try {
                    let results = await search(song, opts).catch(err => console.log(err))
                    if (results) {
                        let youtubeResults = results.results
                        let i = 0
                        let titles = youtubeResults.map(result => {
                            i++
                            return i + ") " + result.title
                        })
                        let selected = youtubeResults[0]
                        play(selected.link);
                    }
                    return
                } catch (err) {
                    const error2Embed = new Discord.MessageEmbed()
                    .setColor('7A54C5')
                    .setDescription('Video not found.')
                    message.channel.send(error2Embed)
                }
            }
        } 
    }
}