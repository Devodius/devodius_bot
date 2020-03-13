const Discord = require('discord.js');
const Mongoose = require('mongoose');

const environnment = require('./environment.json');
const config = require('./config.json');
const shortcut = require('./shortcut.json');

const commandList = require('./commandList');
const cmdHelp = require('./action/help');
const AlbionSetupCall = require('./action/albion/setupCall');
const CallService = require('./service/callsService');

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
    message.content = await searchShortcut(message.content);
    console.log('command: ', message.content);
    if (message.content.substring(0, 3) == 'ax/' && message.guild) {
		let args = message.content.substring(3).split(' ');
		args = args.filter(n => n);
        args[0] = args[0].toLowerCase();

        console.log("Command received: " + args);
        if (args.length > 0 && commandList[args[0]] != undefined) {
            let authorized = await commandList[args[0]]['Auth'](message, args);
            if (authorized) {
                args[1] = args.length > 1 ? args[1].toLowerCase() : "";
                if (args.length > 1 && commandList[args[0]]['cmd'][args[1].toLowerCase()] != undefined)
                    commandList[args[0]]['cmd'][args[1].toLowerCase()]['run'](bot, message, args)
                else
                    commandList[args[0]]['cmd']['help']['run'](bot, message, args)
            }
        } else
            cmdHelp(bot, message, args);
    }
    if (!message.guild) {
        tmp = await CallService.getCallValidByuser(message.author.id);
        if (tmp)
            AlbionSetupCall.setup(bot, message, [tmp]);
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
