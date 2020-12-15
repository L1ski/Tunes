module.exports = {
    name: 'help',
    description: 'Helps you with the bot!',
    execute(message, Discord) {
        const HelpEmbed = new Discord.MessageEmbed()
        .setColor('7A54C5')
        .setAuthor('tunesbot.net', 'https://media.discordapp.net/attachments/788220046873985087/788407233133805628/tunes5.png', 'https://tunesbot.net')
        .setTitle('Help')
        .setThumbnail('https://media.discordapp.net/attachments/788220046873985087/788407233133805628/tunes5.png')
        .setDescription('Here is all my commands :musical_note:')
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL())
        .addFields(
            {name: '!play', value: 'Plays some music', inline: true},
            {name: '!stop', value: 'Stops the music', inline: true},
            {name: '!skip', value: 'Skips the current song', inline: true},
            {name: '!fs', value: 'This will force skip the current song', inline: true},
            {name: '!pause', value: 'Pauses the current song', inline: true},
            {name: '!resume', value: 'Resumes the current song', inline: true},
            {name: '!queue', value: 'Shows the queue', inline: true},
            {name: '!search', value: 'Makes a youtube search', inline: true},
            {name: '!currentsong', value: 'Gives you the name of the current song', inline: true},
            {name: '!createplaylist', value: 'Creates a playlist', inline: true},
            {name: '!deleteplaylist', value: 'Deletes your playlist', inline: true},
            {name: '!playlist', value: 'Shows your own playlist', inline: true},
        )
        message.channel.send(HelpEmbed)
    }
}