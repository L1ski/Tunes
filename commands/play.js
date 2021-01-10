const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const queue = require('./queue.js')

module.exports = {
	name: 'play',
	description: '´Plays music!',
	execute(message, args) {
		message.channel.send('playing ' + args)

		const voiceChannel = message.member.voice.channel;

		if(!voiceChannel) {
			const ErrorEmbed = new Discord.MessageEmbed()
			.setColor('#7A54C5')
			.setDescription('You need to be in a voice channel 🎵')
			message.channel.send(ErrorEmbed)
		} else {
			voiceChannel.join();
		}
	},
};