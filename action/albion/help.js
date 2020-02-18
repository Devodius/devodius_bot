const Discord = require('discord.js');

const commandList = require('../../commandList');

module.exports = (bot, message, args) => {
    const messageRet = new Discord.RichEmbed()
    .setTitle('Aide Albion');

    for (const cmd in commandList['albion']['cmd'])
        messageRet.addField(commandList['albion']['cmd'][cmd]['readme']['use'], commandList['albion']['cmd'][cmd]['readme']['desc'])
    message.channel.send(messageRet);
}