// This is the main file for the bot. This must run when you want to run the bot.

// Dependencies
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

// Files
const config = require('./config.json');



client.on('ready', () => {
    console.log('Tunes is online!')
    client.user.setActivity('!help 🎵', ({ type: 'LISTENING' }))
})

client.login(config.TOKEN)

//Embed Color Code >> 7A54C5


//Command Registering
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    
    var args = message.content.split(' ')

    //Command Handling
    switch(args[0].toLowerCase()) {

    }

})

