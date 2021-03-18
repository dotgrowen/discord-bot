const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command.js')

client.on('ready', () => {
    console.log('The client is ready!')

    command(client, ['ping', 'test'], (message) => {
        console.log("pong")
        message.channel.send('Pong!')
    })
})

client.login(config.token)
// client.login(process.env.DJS_TOKEN)
