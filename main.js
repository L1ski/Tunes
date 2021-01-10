// This is the main file for the bot. This must run when you want to run the bot.

// Dependencies
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

// Files
const config = require('./config.json');

//Settings
//Embed Color Code >> 7A54C5
prefix = '!'

client.on('ready', () => {
    console.log('Tunes is online!')
    client.user.setActivity('!help 🎵', ({ type: 'LISTENING' }))
})

client.login(config.TOKEN)


//Command Registering
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//Command Handler
client.on('message', message => {
    if (message.author.bot) return;
    var args = message.content.split(' ')
    if (!args[0].startsWith('!')) return;
    const command = args[0].toString().replace('!', '')
    if (client.commands.has(command)) {
        try {
            client.commands.get(command).execute(message, args)
        } catch (error) {
            console.log(error)
            message.reply('Error executing the command.')
        }
    } else {
        const cmdnotfound = new Discord.MessageEmbed()
        .setColor('#7A54C5')
        .addField('Command not found!', ' \nCheck out my commands [HERE](https://tunesbot.net/commands)')
        message.channel.send(cmdnotfound);
    }
    
})

