const Discord = require('discord.js')

const CallService = require('../../service/callsService');

module.exports = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('#c71a1a')
    .setTitle('listCall')
    try {
        const calls = await CallService.getAllDone(message.guild.id);
        let tab = [];
        calls.forEach(call => {
            tab.push(call.activity + ': ' + call.messId);
        })
        embed.addField('Activité: MessageID', tab);
        embed.addField('Pour supprimer un call:', 'ax/albion deleteCall [MessageID]');
        message.channel.send(embed);
    } catch(err) {
        console.log('err: ', err);
        embed.setDescription(':red_square: Error');
        message.channel.send(embed);
    }
}