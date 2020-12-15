// This is the main file for the bot. This must run when you want to run the bot.
const discord = require('discord.js')
const config = require("./config.json")

const client = new Discord.Client();
client.login(config.TOKEN)