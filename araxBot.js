const Discord = require('discord.js');
const Mongoose = require('mongoose');

const environnment = require('./environment.json');
const config = require('./config.json');
const shortcut = require('./shortcut.json');

const commandList = require('./commandList');
const cmdHelp = require('./action/help');
const AlbionSetupCall = require('./action/albion/setupCall');
const CallService = require('./service/callsService');
const SetupService = require('./service/setupService');

Mongoose.Promise = require('bluebird');
Mongoose.connect(config.dbUrl, {promiseLibrary: require('bluebird'), useNewUrlParser: true, useUnifiedTopology: true})
    .then(_ => console.log('[DB] connection succesfull'))
    .catch(error => console.log(error));

global.prod = process.env.PROD ? true : false;

// Initialize Discord Bot
var bot = new Discord.Client();

bot.on('ready', () => {
    console.log('[DISCORD] Logged in as: ' + bot.user.username + ' - (' + bot.user.id + ')');
    CallService.getAllDone()
        .then(calls => {
            console.log('caching ', calls.length, ' message for reaction about calls');
            calls.forEach(async call => {
                tmp = await bot.channels.fetch(call.discordChannel);
                mess = await tmp.messages.fetch(call.messId);
            });
        }).catch(err => {
            console.log('err: ', err);
        });
});

bot.on('guildCreate', async guild => {
    await SetupService.getSetup(guild);
})

bot.on('guildDelete', async guild => {
    await SetupService.deleteSetup(guild);
})

async function searchShortcut(cmd) {
    for await (let cut of shortcut) {
        if (cmd.startsWith(cut.key)) {
            return (cut.cmd + cmd.substring(cut.key.length));
        }
    }
    return (cmd);
}

bot.on('message', async message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.author.id == bot.user.id)
        return;
    message.content = await searchShortcut(message.content);
    if (message.guild) {
        const setup = await SetupService.getSetup(message.guild);
        if (message.content.substring(0, 3) == 'ax/') {
            console.log('command: ', message.content);
            let args = message.content.substring(3).split(' ');
            args = args.filter(n => n);
            args[0] = args[0].toLowerCase();

            console.log("Command received: " + args);
            if (args.length > 0 && commandList[args[0]] != undefined) {
                let authorized = await commandList[args[0]]['Auth'](setup, message, args);
                if (authorized) {
                    args[1] = args.length > 1 ? args[1].toLowerCase() : "";
                    if (args.length > 1 && commandList[args[0]]['cmd'][args[1].toLowerCase()] != undefined)
                        commandList[args[0]]['cmd'][args[1].toLowerCase()]['run'](bot, setup, message, args)
                    else
                        commandList[args[0]]['cmd']['help']['run'](bot, setup, message, args)
                }
            } else
                cmdHelp(bot, message, args);
        }
    }
    if (!message.guild) {
        const call = await CallService.getCallValidByuser(message.author.id);
        if (call) {
        const setup = await SetupService.getSetup(bot.guilds.resolve(call.discordGuild));
            AlbionSetupCall.setup(bot, setup, message, [call]);
        }
    }
});

bot.on('messageReactionAdd', async (messageReaction, user) => {
    if (messageReaction.emoji.toString() == '✅' && user.id != bot.user.id)
        AlbionSetupCall.addToReact(bot, messageReaction, user);
})

bot.on('messageReactionRemove', async (messageReaction, user) => {
    if (messageReaction.emoji.toString() == '✅' && user.id != bot.user.id)
        AlbionSetupCall.removeToReact(bot, messageReaction, user);
})

bot.login(environnment[global.prod ? "prod" : "dev"].auth);
