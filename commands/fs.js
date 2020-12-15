module.exports = {
    name: 'fs',
    description: 'Force skips the current song',
    execute(message, Discord) {

        if(message.member.roles.cache.some(r=>['DJ'].includes(r.name)) ) {
            message.channel.send('testi')
        } else {
            const ErrorEmbed = new Discord.MessageEmbed()
            .setColor('7A54C5')
            .setDescription('You do not have permissions to execute this command.')
            message.channel.send(ErrorEmbed)
        }
    }
}