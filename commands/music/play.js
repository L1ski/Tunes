const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const db = require('quick.db');


module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['p'],
            memberName: 'play',
            group: 'music',
            description: 'Play any song or playlist from youtube!',
            guildOnly: true,
            clientPermissions: ['SPEAK', 'CONNECT'],
            args: [{
                key: 'query',
                prompt: 'sexaan tyttöjä',
                type: 'string',
                validate: function(query) {
                    return query.length > 0 && query.length < 200;
                }
            }]
        });
    }

    async run(message, { query }) {
        console.log(query)
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            message.say(':no_entry: Please join a voice channel and try again!');
            return;
        }
    }


};