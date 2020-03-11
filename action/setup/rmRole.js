const Discord = require('discord.js');

const RoleService = require('../../service/roleService');

module.exports = async (bot, message, args) => {
    const messageRet = new Discord.MessageEmbed()
        .setTitle('Suppression de role');

    if (args.length < 3)
        messageRet.addField('ax/setup rmRole [emote / role]', 'Pour retirer un role');
    else {
        try {
            await RoleService.removeRole(args[2])
            messageRet.setDescription(':white_check_mark:');
        } catch (err) {
            if (err === 'Not Found')
                messageRet.setDescription(':red_square: non trouvé');
            else {
                console.log('rmRole err: ', err);
                messageRet.setDescription(':red_square:');
            }
        }
    }
    message.channel.send(messageRet);
}