const Discord = require('discord.js');
const SetupService = require('../../service/setupService')
const DiscordService = require('../../service/discordService');

async function albionRoleMess(bot, setup, message) {
    const newMess = await message.author.send("Paramétrage de AraxBot\nEnvoyer l'ID du role à ping pour albion\nPour obtenir cet ID, vous pouvez vous rendre sur votre serveur et ecrire `\\@role`");
    newMess.channel.awaitMessages(_ => {return true}, {max: 1, time: 120000})
        .then(async collected => {
            const guild = bot.guilds.resolve(setup.discordGuildId);
            const role = await guild.roles.fetch(collected.first().content)
                if (role) {
                    await SetupService.updateSetup(message.guild, {albionMention: role.id});
                    message.author.send(":white_check_mark: AraxBot paramètré")
                } else {
                    message.author.send(":red_square: Le message envoyé ne contient pas de role valide");
                    albionRoleMess(bot, setup, message);
                }
        }).catch(err => {
            console.log("err: ", err);
            message.author.send(":red_square: Erreur, réessayer");
        })
}

async function albionAnonMess(bot, setup, message) {
    const newMess = await message.author.send("Paramétrage de AraxBot\nEnvoyez l'ID du channel d'annonce pour albion");
    newMess.channel.awaitMessages(_ => {return true}, {max: 1, time: 120000})
        .then(async collected => {
            const chanId = collected.first().content;
            bot.channels.fetch(chanId)
                .then(async chan => {
                    const tmp = await SetupService.updateSetup(message.guild, {albionAnonChan: chanId});
                    albionRoleMess(bot, setup, message);
                }).catch(err => {
                    message.author.send(":red_square: Le message envoyé ne contient pas de channel valide");
                    albionAnonMess(bot, setup, message);
                })
        }).catch(err => {
            message.author.send(":red_square: Erreur, réessayer");
        })
}

module.exports = async (bot, setup, message, args) => {
    albionAnonMess(bot, setup, message);
}