const Discord = require('discord.js')

const CallsService = require('../../service/callsService');
//const environnment = require('../../environment.json');

class SetupCall {

    _getEmbed(call) {
        const embed = new Discord.MessageEmbed()
        .setColor("#a225f5")
        .setTitle('Call')
        .addField("leader", call.leader, true)
        .addField("activité", call.activity, true)
        .addField("description", call.description, true)
        .addField("stuff", call.stuff, true)
        .addField("zone", call.zone, true)
        .addField("lieu de rendez-vous", call.meetingPoint, true)
        .addField("heure", call.time, true)
        .addField("durée", call.duration, true)
        .addField("nombre de place", call.numPeople, true)
        const listPeople1 = Array();
        const listPeople2 = Array();
        const listPeople3 = Array();
        call.people.forEach((one, index) => {
            if ((index % 3) == 0 && index < call.numPeople)
                listPeople1.push('|' + one.role + '| ' + one.display)
        });
        call.people.forEach((one, index) => {
            if (((index + 1) % 3) == 0 && index < call.numPeople)
                listPeople2.push('|' + one.role + '| ' + one.display)
        });
        call.people.forEach((one, index) => {
            if (((index + 2) % 3) == 0 && index < call.numPeople)
                listPeople3.push('|' + one.role + '| ' + one.display)
        });
        embed.addField('Participants (' + (call.people.length > call.numPeople ? call.numPeople : call.people.length) + '/' + call.numPeople +'):\n|T|: Tank |D|: Dps |H|: Heal', listPeople1.length ? listPeople1 : '\u200b', true);
        if (listPeople2.length)
            embed.addField('\u200b', listPeople2, true);
        if (listPeople3.length)
            embed.addField('\u200b', listPeople3, true);
        embed.addField('\u200b', "présent: :white_check_mark:");
        return embed;
    }

    async _displayCall(bot, call, guild_setup) {
        const messageRet = this._getEmbed(call);
        const chan = await bot.channels.fetch(call.discordChannel);
        if (chan) {
            chan.send("<@&" + guild_setup.albionMention + ">");
            chan.send(messageRet)
            .then(mess => {
                CallsService.updateCall(call.id, {messId: mess.id});
                mess.react('✅');
            }).catch(err => {
                console.log('err: ', err);
            });
        }
    }

    async _startMessage(message, guild_setup) {
        const call = await CallsService.getCallValidByuser(message.author.id);
        if (call != null)
            await CallsService.deleteById(call._id);
        await CallsService.addCall({discordUser: message.author.id, discordChannel: guild_setup.albionAnonChan, discordGuild: message.guild.id});
        message.author.send("Setup call commencé\n\nIndiquez le leader du call");
    }

    async _leaderMessage(call, message) {
        CallsService.updateCall(call.id, {leader: message.content, done: 1});
        message.author.send("Indiquez l'activité");
    }

    async _activityMessage(call, message) {
        CallsService.updateCall(call.id, {activity: message.content, done: 2});
        message.author.send("Indiquez la description");
    }

    async _descriptionMessage(call, message) {
        CallsService.updateCall(call.id, {description: message.content, done: 3});
        message.author.send("Indiquez le stuff recomendé");
    }

    async _stuffMessage(call, message) {
        CallsService.updateCall(call.id, {stuff: message.content, done: 4});
        message.author.send("Indiquez la zone du call (couleur)");
    }

    async _zoneMessage(call, message) {
        CallsService.updateCall(call.id, {zone: message.content, done: 5});
        message.author.send("Indiquez le lieu de rencontre");
    }

    async _meetingMessage(call, message) {
        CallsService.updateCall(call.id, {meetingPoint: message.content, done: 6});
        message.author.send("Indiquez l'heure de rendez-vous");
    }

    async _timeMessage(call, message) {
        CallsService.updateCall(call.id, {time: message.content, done: 7});
        message.author.send("Indiquez la duré éstimé");
    }

    async _durationMessage(call, message) {
        CallsService.updateCall(call.id, {duration: message.content, done: 8});
        message.author.send("Indiquez le nombre de place disponible");
    }

    async _numPeopleMessage(call, message) {
        try {
            const tmp = await CallsService.updateCall(call.id, {numPeople: message.content, done: 9});
            message.author.send("```leader: " + tmp.leader +
                                "\nactivity: " + tmp.activity +
                                "\ndescription: " + tmp.description +
                                "\nstuff: " + tmp.stuff +
                                "\nzone: " + tmp.zone +
                                "\nlieu de rendez-vous: " + tmp.meetingPoint +
                                "\nheure: " + tmp.time +
                                "\ndurée: " + tmp.duration +
                                "\nnombre de place: " + message.content +
                                "```\nvalider ? (y/n)");
        } catch (err) {
            this._durationMessage(call, {author: message.author, content: call.duration});
        }
    }

    async _validateMessage(call, message, bot, guild_setup) {
        const messageRet = new Discord.MessageEmbed()
        if (message.content.toLowerCase() != 'y') {
            messageRet.setTitle('Suppression du call')
            try {
                await CallsService.deleteById(call._id);
                messageRet.setDescription(':white_check_mark:');
                message.author.send(messageRet);
            } catch (err) {
                console.log("err: ", err);
                messageRet.setDescription(':red_square:');
                message.author.send(messageRet);
            }
            return;
        }
        CallsService.updateCall(call.id, {done: 10});
        this._displayCall(bot, call, guild_setup);
        messageRet.setTitle('Ajout du call');
        messageRet.setDescription(':white_check_mark:');
        message.author.send(messageRet);
    }

    async setup(bot, guild_setup, message, args) {
        if (args.length >= 2 && args[1] == 'setupcall')
            this._startMessage(message, guild_setup);
        if (args[0].done == 0)
            this._leaderMessage(args[0], message);
        if (args[0].done == 1)
            this._activityMessage(args[0], message);
        if (args[0].done == 2)
            this._descriptionMessage(args[0], message);
        if (args[0].done == 3)
            this._stuffMessage(args[0], message);
        if (args[0].done == 4)
            this._zoneMessage(args[0], message);
        if (args[0].done == 5)
            this._meetingMessage(args[0], message);
        if (args[0].done == 6)
            this._timeMessage(args[0], message);
        if (args[0].done == 7)
            this._durationMessage(args[0], message);
        if (args[0].done == 8)
            this._numPeopleMessage(args[0], message);
        if (args[0].done == 9)
            this._validateMessage(args[0], message, bot, guild_setup);
    }

    async _posPeopleFromList(people, userId) {
        return new Promise(async (resolve, reject) => {
            for await (let person of people) {
                if (person.discord == userId) {
                    resolve(people.indexOf(person));
                    break;
                }
            }
            reject();
        })
    }

    async addToReact(bot, messageReaction, user) {
        try {
            const call = await CallsService.getCallByMessId(messageReaction.message.id);
            await this._posPeopleFromList(call.people, user.id)
        } catch(err) {
            const embed = new Discord.MessageEmbed()
            .setColor("#a225f5")
            .setTitle('Inscription')
            const newmess = await user.send(`Participer avec quel role ?\n'T'(Tank) / 'D'(Dps) / 'H'(Heal)`);
            newmess.channel.awaitMessages(_ => {return true}, {max: 1, time: 30000, errors: ['time']})
                .then(async collected => {
                    if (collected.first().content === 'T' || collected.first().content === 'D' || collected.first().content === 'H') {
                        embed.addField('\u200b', ':white_check_mark:');
                        user.send(embed);
                        const call = await CallsService.getCallByMessId(messageReaction.message.id);
                        const channel = await bot.channels.fetch(call.discordChannel)
                        const member = channel.members.get(user.id);
                        call.people.push({discord: user.id, display: (member.nickname ? member.nickname : user.username), role: collected.first().content});
                        call.save();
                        const newEmbed = this._getEmbed(call);
                        messageReaction.message.edit(newEmbed);
                    } else {
                        embed.addField('\u200b', ':red_square: Invalid');
                        user.send(embed);
                    }
                }).catch(err => {
                    console.log('err: ', err);
                    embed.addField('\u200b', ':red_square: Time Out');
                    user.send(embed);
                })
        }
    }

    async removeToReact(bot, messageReaction, user) {
        const call = await CallsService.getCallByMessId(messageReaction.message.id);

        try {
            const pos = await this._posPeopleFromList(call.people, user.id);
            call.people.splice(pos, 1);
            call.save();
        } catch(err) {}
        const newEmbed = this._getEmbed(call);
        messageReaction.message.edit(newEmbed);
    }
}

module.exports = new SetupCall();