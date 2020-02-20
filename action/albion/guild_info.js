const Discord = require('discord.js');
const AlbionService = require('../../service/albionService.js');

module.exports = async (bot, message, args) => {
    const messageRet = new Discord.RichEmbed()

    if (args.length < 3)
        return undefined;
    try {
        let info = await AlbionService.findguild(args[2]);
        let length = info.length;
        let stat = await AlbionService.findfullguild(info);
        stat.Founded = stat.Founded.substr(0, 10);
        messageRet.setAuthor("Satistique de la guilde: " + stat.Name, 'https://www.zupimages.net/up/20/08/6y4k.jpg');
        messageRet.addField('\u200b', ['```| Fondateur: ' + stat.FounderName, '| Créé le: ' + stat.Founded, '| Nombre de joueurs: ' + stat.MemberCount, '| Kill fame: ' + stat.killFame , '| Death fame: ' + stat.DeathFame + '```']);
    } catch (err) {
        messageRet.addField('La guilde n\'a pas été trouvé', '\u200b');
        console.log('GuildInfo: ', err);
    }
    message.channel.send(messageRet);
}