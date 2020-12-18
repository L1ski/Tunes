// This is the main file for the bot. This must run when you want to run the bot.

// Dependencies
const { Discord, Structures } = require('discord.js');
const { CommandoClient } = require('discord.js-commando');

// Files
const mysql = require('./bot/mysql/mysql.js');
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

const client = new CommandoClient({
    commandPrefix: prefix,
    owner: '368387873449181186',
    unknownCommandResponse: true
});

client.registry
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

PREFIX = '!';

const client = new Discord.Client();
client.login(config.TOKEN)

client.on('ready', () => {
    console.log('Tunes is online!')
    client.user.setActivity('!help 🎵', ({ type: 'LISTENING' }))
})


//Embed Color Code >> 7A54C5


//Command Handler
client.commands = new Discord.Collection();

client.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).split(/ +/)
    const command = args.shift();


    //Command Handling
    switch(command.toLowerCase()) {
        case 'play':
            client.commands.get('play').execute(message);
            break;
        case 'help':
            client.commands.get('help').execute(message, Discord, args);
            break;
        case 'stop':
            client.commands.get('stop').execute(message, Discord, args);
            break;
        case 'skip':
            client.commands.get('skip').execute(message, Discord, queue);
            break;
        case 'fs':
            client.commands.get('fs').execute(message, Discord);
            break;
        case 'seek':
            client.commands.get('seek').execute(message, Discord, args);
            break;
        case 'search':
            client.commands.get('search').execute(message, Discord, args, search, opts, queue);
            break;
        case 'resume':
            client.commands.get('resume').execute(message, Discord, args);
            break;
        case 'pause':
            client.commands.get('pause').execute(message, Discord, args);
            break;
        case 'queue':
            client.commands.get('queue').execute(message, Discord, args, ytdl, queue);
            break;
        default:
            const ErrorEmbed = new Discord.MessageEmbed()
            .setColor('7A54C5')
            .setDescription('I did not recognize that command. Visit our [website](https://youtube.com) to see all the commands.')
            message.channel.send(ErrorEmbed)
    }
})

