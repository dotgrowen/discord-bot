const firstMessage = require('./first-message')

module.exports = async (client) => {
    const channelId = '823424538292781057'

    const emojis = {
        "📕": 'fear-ping',
        "📙": 'depression-ping',
        "📒": 'anxiety-ping',
        "📗": 'lonely-ping',
        "📘": 'stress-ping',
        "📖": 'angry-ping',
        "📓": 'heartbreak-ping',
        "📔": 'insecure-ping',
    }

    const reactions = []

    for (const key in emojis) {
        const emoji = key
        reactions.push(emoji)
        const role = emojis[key]
    }

    const channel = await client.channels.fetch(channelId)

    channel.messages.fetch()
    
    const handleReaction = (reaction, user, add) => {

        if (user.id === '822002544829530142') {
            return
        }

        const emoji = reaction._emoji.name
        console.log(emoji)
        const { guild } = reaction.message

        const roleName = emojis[emoji]
        console.log(roleName)
        if (!roleName) {
            return
        }

        const role = guild.roles.cache.find((role) => role.name === roleName)
        const member = guild.members.cache.find((member) => member.id === user.id)


        if (add) {
            member.roles.add(role)
        } else {
            member.roles.remove(role)
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {

        if (reaction.message.channel.id === channelId) {
            console.log('add')
            handleReaction(reaction, user, true)
        }
    })

    client.on('messageReactionRemove', (reaction, user) => {

        if (reaction.message.channel.id === channelId) {
            console.log('remove')
            handleReaction(reaction, user, false)
        }
    })
}
