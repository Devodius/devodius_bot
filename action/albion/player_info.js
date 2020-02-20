const Discord = require('discord.js');
const AlbionService = require('../../service/albionService.js');

module.exports = async (bot, message, args) => {
    const messageRet = new Discord.RichEmbed()

    if (args.length < 3)
        return undefined;
    try {
        let i;
        if (args[3] == undefined || Number.isInteger(args[3]))
            i = 0;
        else
            i = args[3] - 1;
        let info = await AlbionService.findplayer(args[2]);
        let length = info.length;
        let stat = await AlbionService.findfullplayer(info[i].Id);
        messageRet.setAuthor("Satistique du joueur: " + stat.Name, 'https://www.zupimages.net/up/20/08/6y4k.jpg');
        messageRet.addField('\u200b', ['```| Pseudo: ' + stat.Name, '| Guild: ' + stat.GuildName, '| PvE fame: ' + stat.LifetimeStatistics.PvE.Total, '| PvP fame: ' + stat.KillFame , '| Récolte fame: ' + stat.LifetimeStatistics.Gathering.All.Total, '|    Fibre fame: ' + stat.LifetimeStatistics.Gathering.Fiber.Total, '|    Peau fame: ' + stat.LifetimeStatistics.Gathering.Hide.Total, '|    Bois fame: ' + stat.LifetimeStatistics.Gathering.Wood.Total, '|    Cailloux fame: ' + stat.LifetimeStatistics.Gathering.Rock.Total, '|    Minerai fame: ' + stat.LifetimeStatistics.Gathering.Ore.Total + '```']);
        if (length != 1)
            messageRet.addField('\u200b', length + ' joueurs utilisent ce pseudo, ajoute un n° de page à la suite de ta commande pour changer de page');
        else
            messageRet.addField('\u200b', 'Bravo tu est le seul et l\'unique');
    } catch (err) {
        messageRet.addField('Le joueur n\'a pas été trouvé', '\u200b');
        console.log('PlayerInfo: ', err);
    }
    message.channel.send(messageRet);
}