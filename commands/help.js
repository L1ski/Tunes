module.exports = {
    name: 'help',
    description: 'Helps you with the bot!',
    execute(message, Discord) {
        const HelpEmbed = new Discord.MessageEmbed()
        .setColor('7A54C5')
        .setAuthor('tunesbot.net', 'https://media.discordapp.net/attachments/788220046873985087/788407233133805628/tunes5.png', 'https://tunesbot.net')
        .setTitle('Help')
        .setThumbnail('https://media.discordapp.net/attachments/788220046873985087/788407233133805628/tunes5.png')
        .setDescription('You can check all my commands from the [website](https://youtube.com) :musical_note:')
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL())
        message.channel.send(HelpEmbed)
    }
}