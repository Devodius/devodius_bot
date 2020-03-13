const Discord = require('discord.js');

const CallsService = require('../../service/callsService');

module.exports = async (bot, message, args, all = false) => {
    const embed = new Discord.MessageEmbed()
    .setColor('#a225f5')
    .setTitle('Suppression call');
    if (all) {
        try {
            await CallsService.deleteAll(message.guild.id);
            embed.setDescription(':white_check_mark:');
        } catch (err) {
            embed.setDescription(':red_square:');
            console.log('err: ', err);
        }
    } else if (args.length >= 3) {
        try {
            await CallsService.deleteByMessId(args[2]);
            embed.setDescription(':white_check_mark:');
        } catch (err) {
            embed.setDescription(':red_square:');
            console.log('err: ', err);
        }
    } else {
        embed.setDescription('Wrong use');
    }
    message.channel.send(embed);
}