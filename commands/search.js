const play = require("./play")

module.exports = {
    name: "search",
    description: "Youtube song search",
    execute(message, Discord, args, search, opts, ytdl, queue) {
        
        const voiceChannel = message.member.voice.channel

        if (args.length < 1) {
            const ErrorEmbed = new Discord.MessageEmbed()
            .setColor('7A54C5')
            .setDescription('You have to tell me what to search. Example **!search <video-name>**')
            message.channel.send(ErrorEmbed)
            return
        }
        if (!voiceChannel) {
            const error2Embed = new Discord.MessageEmbed()
            .setColor('7A54C5')
            .setDescription('You need to be in a voice channel.')
            message.channel.send(error2Embed)
            return
        }

        function sendMusicEmbed(link) {
            const MusicEmbed = new Discord.MessageEmbed()
            .setColor('7A54C5')
            .setAuthor(selected.link.videoDetails.author.name, selected.link.videoDetails.author.thumbnails[0].url)
            .setTitle(selected.link.videoDetails.title)
            .setThumbnail('https://media.discordapp.net/attachments/788220046873985087/788407233133805628/tunes5.png')
            .setURL(selected.link.videoDetails.video_url)
            .setImage(selected.link.videoDetails.thumbnail.thumbnails[1].url)
            .setTimestamp()
            .setFooter('Requested by ' + message.author.username, message.author.avatarURL())
            .addFields(
                { name: 'Views', value: selected.link.videoDetails.viewCount.toLocaleString(), inline: true },
                { name: 'Likes', value: selected.link.videoDetails.likes.toLocaleString(), inline: true },
                { name: 'Dislikes', value: selected.link.videoDetails.dislikes.toLocaleString(), inline: true },
            )
            message.channel.send(MusicEmbed)
        }
        
        searchFor(args.slice(0).join(" "));

        async function searchFor(song) {
            let results = await search(song, opts).catch(err => console.log(err))
            if (results) {
                let youtubeResults = results.results
                let i = 0
                let titles = youtubeResults.map(result => {
                    i++
                    return i + ") " + result.title
                })
                const SearchEmbed = new Discord.MessageEmbed()
                .setColor('7A54C5')
                .setTitle('Song search')
                .setThumbnail('https://media.discordapp.net/attachments/788220046873985087/788407233133805628/tunes5.png')
                .setDescription('Type the number of the song in the chat so I can play it to you.')
                .setFooter('Search made by ' + message.author.username, message.author.avatarURL())
                .setTimestamp()
                .addField('\u200b', titles.join("\n"), false )
                message.channel.send(SearchEmbed)

                filter = m => (m.author.id === message.author.id) //&& m.content >= 1 && m.content <= youtubeResults.length;
                let collected = await message.channel.awaitMessages(filter, { max: 1 });
                let selected = youtubeResults[collected.first().content -1]
                if (selected != null) {
                    const connection = voiceChannel.join()
                    .then(async connection => {
                            sendMusicEmbed(selected.link)
                            console.log(selected.link)
                            const songInfo = await (await ytdl.getInfo(selected.link))
                            connection.play(ytdl(selected.link))
                            if (queue.length == 0) {
                                queue.push(selected.link)
                                const dispatcher = connection.play(ytdl(selected.link))
                                dispatcher.on('finish', () => {
                                    queue.shift(selected.link)
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
                                queue.push(selected.link)
                            }
                        })
                }
            }
        }
    }
}