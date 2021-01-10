const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['info'],
	description: 'Sends help embed',
	execute(message, args) {
        const HelpEmbed = new Discord.MessageEmbed()
        .setColor('#7A54C5')
        .setAuthor()
        .setThumbnail('https://cdn.discordapp.com/attachments/788549224022802443/788549262320730162/Tunes_logo.png')
        .addFields(
            {name: 'Commands', value: 'Commands can be found [here](https://tunesbot.net/commands)', inline: false},
            {name: 'Other links', value: '[Github](https://github.com/L1ski/Tunes), [Invite Link](https://youtube.com), [Tunes Website](https://tunesbot.net)'}
        )
        message.channel.send(HelpEmbed)
    }
}