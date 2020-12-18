// This is the main file for the bot. This must run when you want to run the bot.

// Dependencies
const { Discord, Structures } = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

// Files
const config = require('./config.json');

Structures.extend('Guild', Guild => {
    class MusicGuild extends Guild {
      constructor(client, data) {
        super(client, data);
        this.musicData = {
            queue: [],
            isPlaying: false,
            volume: 1,
            songDispatcher: null
        };
      }
    }
    return MusicGuild;
});

PREFIX = '!'

const client = new CommandoClient({
    commandPrefix: PREFIX,
    unknownCommandResponse: true
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['music', 'Music Command Group']
  ])
  .registerDefaultGroups()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Tunes is online!')
    //client.user.setActivity('!help 🎵', ({ type: 'LISTENING' }))
    client.user.setActivity(PREFIX+'help', {
        type: 'STREAMING',
        url: 'https://github.com/L1ski/Tunes'
    });
})

client.login(config.TOKEN)

//Embed Color Code >> 7A54C5


client.on('message', message => {
    
    var args = message.content.split(' ')

    //Command Handling
    switch(args[0].toLowerCase()) {

    }

})

