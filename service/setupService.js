const Mongoose = require('mongoose');
const Setup = require('../models/setupModel');

class SetupService {
    addDefaultSetup(guild) {
        return new Promise(async (resolve, reject) => {
            const newSetup = new Setup();
            newSetup.discordGuildId = guild.id;
            await newSetup.save();

            let chan = guild.systemChannel;
            chan = chan ? chan : guild.channels.cache.filter(c => c.type === 'text').find(x => x.position == 0);
            chan.send("Hello, c'est AraxBot\nCe serveur ne me dit rien, pensez à lancer la commande `ax/setup base` pour me préparer");
            resolve(newSetup);
        })
    }

    getSetup(guild) {
        return new Promise(async (resolve, reject) => {
            Setup.findOne({discordGuildId: guild.id}, async (err, setup) => {
                if (err)
                    reject(err);
                if (setup == null)
                    setup = await this.addDefaultSetup(guild);
                resolve(setup);
            })
        })
    }

    updateSetup(guildId, update) {
        return new Promise((resolve, reject) => {
            Setup.updateOne({discordGuildId: guildId}, update, (err, set) => {
                if (err)
                    reject(err);
                resolve(set);
            })
        })
    }

    deleteSetup(guild) {
        return new Promise((resolve, reject) => {
            Setup.deleteOne({discordGuildId: guild.id}, (err, res) => {
                if (err)
                    reject(err);
                resolve();
            })
        })
    }
}

module.exports = new SetupService();