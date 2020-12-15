// This is the main file for the bot. This must run when you want to run the bot.
const Discord = require('discord.js');
const mysql = require('./bot/mysql/mysql.js')
const config = require('./config.json');
const search = require('youtube-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const opts = {
    maxResults: 3,
    key: 'AIzaSyDo7-NnYlho_6KB_qAUXHJX5kmvSFCnWbk',
    type: 'video'
};

var queue = [];

PREFIX = '!';

const client = new Discord.Client();
client.login(config.TOKEN)
console.log('Tunes is online!')


//Embed Color Code >> 7A54C5


//Command Handler
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {

    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    var args = message.content.slice(PREFIX.length).split(/ +/)
    const command = args.shift();


    //Command Handling
    switch(command.toLowerCase()) {
        case 'play':
            client.commands.get('play').execute(message, Discord, args, ytdl, opts, search, queue);
            break;
        case 'help':
            client.commands.get('help').execute(message, Discord, args);
            break;
        case 'stop':
            client.commands.get('stop').execute(message, Discord, args);
            break;
        case 'skip':
            client.commands.get('skip').execute(message, Discord, ytdl, queue);
            break;
        case 'fs':
            client.commands.get('fs').execute(message, Discord);
            break;
        case 'seek':
            client.commands.get('seek').execute(message, Discord, args);
            break;
        case 'search':
            client.commands.get('search').execute(message, Discord, args);
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

