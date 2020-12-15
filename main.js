// This is the main file for the bot. This must run when you want to run the bot.
const Discord = require('discord.js');
const mysql = require('./bot/mysql/mysql.js')
const config = require('./config.json');
const ytdl = require('ytdl-core');
const fs = require('fs');

PREFIX = '!';

var queue = [];

const client = new Discord.Client();
client.login(config.TOKEN)
console.log('Tunes is online!')


//Command Handler
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.on('message', message => {

    if(!message.content.startsWith(PREFIX) || message.author.client) return;

    var args = message.content.split(' ')
    const command = args.shift();


    //Command Handling
    switch(command.toLowerCase()) {
        case 'play':
            client.commands.get('play').execute(message, Discord, args)
            break;
        case 'stop':
            client.commands.get('stop').execute(message, Discord, args)
            break;
        case 'skip':
            client.commands.get('skip').execute(message, Discord, args)
            break;
        case 'seek':
            client.commands.get('seek').execute(message, Discord, args)
            break;
        case 'search':
            client.commands.get('search').execute(message, Discord, args)
            break;
        case 'resume':
            client.commands.get('resume').execute(message, Discord, args)
            break;
        case 'pause':
            client.commands.get('pause').execute(message, Discord, args)
            break;
        case 'help':
            client.commands.get('help').execute(Discord, message)
        default:
            const errorEmbed = new Discord.MessageEmbed()
            .setColor('')
            .setDescription('')
            message.channel.send(errorEmbed)
    }
})

