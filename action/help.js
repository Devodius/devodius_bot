const Discord = require('discord.js');

const commandList = require('../commandList');

module.exports = (bot, message, args) => {
    const messageRet = new Discord.RichEmbed()
        .setTitle('Aide');

    for (const cmd in commandList)
        messageRet.addField(commandList[cmd]['readme']['use'], commandList[cmd]['readme']['desc'])
    message.channel.send(messageRet);
}