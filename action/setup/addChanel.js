const Discord = require('discord.js');
const channelUtils = require('../../chanelsUtils');

module.exports = (bot, message, args) => {
    const messageRet = new Discord.MessageEmbed()
        .setTitle('Ajout d\'un chanel');
    if (args.length < 4)
        messageRet.addField('ax/setup addChanel [type] [chanel Ref]', 'Pour ajouter des channels')
    else {
        try {
            if (args[3].substring(0,2) === '<#' && args[3].substring(args[3].length - 1, args[3].length) === '>')
                channelUtils.addChanel(args[2], args[3].substring(2, args[3].length - 1), message);
            else
                channelUtils.addChanel(args[2], args[3], message);
            messageRet.setDescription(':white_check_mark:');
        } catch(error) {
            console.log('error: ', error);
            messageRet.setDescription(':red_square:');
        }
    }
    message.channel.send(messageRet);
}