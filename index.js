const Discord = require('discord.js')
const client = new Discord.Client()

// const config = require('./config.json')
const command = require('./command.js')
const firstMessage = require('./first-message')
const roleClaim = require('./role-claim')

client.on('ready', () => {
    console.log('The client is ready!')

    roleClaim(client)

    command(client, 'verify', async (message) => {
        if (message.author.bot) return;
        if (message.channel.id === '821967511300997162')
            await message.delete();
        if (message.content.toLowerCase() === '!verify' && message.channel.id === '821967511300997162') {
            await message.delete().catch(err => console.log(err));
            const role = message.guild.roles.cache.get('822856814194196491');
            if (role) {
                try {
                    await message.member.roles.add(role);
                    console.log("Role added!");
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    })

    const addReactions = (message, reactions) => {
        message.react(reactions[0])
        reactions.shift()
        if (reactions.length > 0) {
            setTimeout(() => addReactions(message, reactions), 750)
        }
    }

    command(client, 'react', (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                addReactions(message, reactions=[ "📕","📙","📒","📗","📘","📖","📓","📔",])
            })
        }
    })

    command(client, ['ping', 'test'], (message) => {
        console.log("pong")
        message.channel.send('Pong!')
    })

    command(client, 'servers', (message) => {
        client.guilds.cache.forEach((guild) => {
            console.log(message)
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members`
            )
        })
    })

    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    command(client, 'status', message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            const content = message.content.replace('!status ', '')

            client.user.setPresence({
                activity: {
                    name: content,
                    type: 0
                }
            })
        }
    })

})

// client.login(config.token)
client.login(process.env.DJS_TOKEN)
