const Discord = require('discord.js');

var commandList = require('../../commandList');

module.exports = (bot, message, args) => {
    const messageRet = new Discord.MessageEmbed()
        .setTitle('Aide setup');

    for (const cmd in commandList['setup']['cmd'])
        messageRet.addField(commandList['setup']['cmd'][cmd]['readme']['use'], commandList['setup']['cmd'][cmd]['readme']['desc'])
    message.channel.send(messageRet);
}