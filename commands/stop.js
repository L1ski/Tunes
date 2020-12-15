module.exports = {
    name: 'stop',
    description: 'Stops the current song',
    execute(message, Discord, args) {

        const voiceChannel = message.member.voice.channel

        if(!voiceChannel) {
            const ErrorEmbed = new Discord.MessageEmbed()
            .setColor('7A54C5')
            .setDescription('You need to be in a voice channel')
            message.channel.send(ErrorEmbed)
        } else {
            voiceChannel.leave()
            queue = []
        }
    }
}