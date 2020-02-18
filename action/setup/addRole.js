const Discord = require('discord.js');

const RoleService = require('../../service/roleService');

module.exports = async (bot, message, args) => {
    const messageRet = new Discord.RichEmbed()
        .setTitle('Ajout de role');
    
    if (args.length < 4)
        messageRet.addField('ax/setup addRole [emote] [role]', 'Pour ajouter des couples emote / role');
    else {
        try {
            await RoleService.addRole(args[2], args[3]);
            messageRet.setDescription(':white_check_mark:');
        } catch (err) {
            if (err.name === 'MongoError' && err.code == 11000)
                messageRet.setDescription(':red_square: Déjà utilisé');
            else
                messageRet.setDescription(':red_square:');
        }
    }
    message.channel.send(messageRet);
}