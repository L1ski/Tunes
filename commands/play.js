const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const queue = require('./queue.js')

module.exports = {
	name: 'play',
	description: '´Plays music!',
	execute(message, args) {
		message.channel.send('playing ' + args)
	},
};