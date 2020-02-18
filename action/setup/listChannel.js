const Discord = require('discord.js');
const channelUtils = require('../../chanelsUtils');

module.exports = (bot, message, args) => {
    const chanels = channelUtils.getChanel();
    const messageRet = new Discord.RichEmbed()
        .setTitle('Liste des channels enregistré:');

    if (chanels === undefined) {
        messageRet.setDescription('Aucun channel enregistré')
        messageRet.addField('ax/setup addChanel [type] [chanel Ref]', 'Pour ajouter des channels');
        messageRet.addField('ax/setup help', 'Pour avoir la liste des commandes');
    } else {
        for (const type in chanels) {
            if (chanels[type].length > 0) {
                let listChanel = [];
                for (const pos in chanels[type]) {
                    listChanel.push(message.guild.channels.get(chanels[type][pos]).name);
                }
                messageRet.addField(type, listChanel);
            } else {
                messageRet.addField(type, 'Tous');
            }
        }
        messageRet.addBlankField()
        .addField('ax/setup addChanel [type] [chanel Ref]', 'Pour ajouter des channels');
    }
    message.channel.send(messageRet);
}