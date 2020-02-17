const Discord = require('discord.js')
const chanelUtils = require('../chanelsUtils');

class chanelSetup {

    constructor() { }

    command(bot, message, args) {
        let messageRet;
        switch (args[0]) {
            case 'listChanel':
                const chanels = chanelUtils.getChanel();
                messageRet = new Discord.RichEmbed()
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
            break;
            case 'addChanel':
                messageRet = new Discord.RichEmbed()
                    .setTitle('Ajout d\'un chanel');
                if (args.length < 3)
                    messageRet.addField('ax/setup addChanel [type] [chanel Ref]', 'Pour ajouter des channels')
                else {
                    try {
                        console.log('chanel: ', args[2]);
                        console.log('debut: ' + args[2].substring(0,2) + ' end: ' + args[2].substring(args[2].length - 1, args[2].length))
                        console.log('send: ' + args[2].substring(2, args[2].length - 1));
                        if (args[2].substring(0,2) === '<#' && args[2].substring(args[2].length - 1, args[2].length) === '>')
                            chanelUtils.addChanel(args[1], args[2].substring(2, args[2].length - 1), message);
                        else
                            chanelUtils.addChanel(args[1], args[2], message);
                        messageRet.setDescription(':white_check_mark:');
                    } catch(error) {
                        console.log('error: ', error);
                        messageRet.setDescription(':red_square:');
                    }
                }
                message.channel.send(messageRet);
            break;
        }
    }
}

module.exports = new chanelSetup();
