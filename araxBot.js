const Discord = require('discord.js');
const Mongoose = require('mongoose');

const auth = require('./auth.json');
const config = require('./config.json');

const commandList = require('./commandList');
const cmdHelp = require('./action/help');

Mongoose.Promise = require('bluebird');
Mongoose.connect(config.dbUrl, {promiseLibrary: require('bluebird'), useNewUrlParser: true, useUnifiedTopology: true})
    .then(_ => console.log('[DB] connection succesfull'))
    .catch(error => console.log(error));

// Initialize Discord Bot
var bot = new Discord.Client();

bot.on('ready', () => {
    console.log('[DISCORD] Logged in as: ' + bot.user.username + ' - (' + bot.user.id + ')');
});

bot.on('message', async message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.content.substring(0, 3) == 'ax/') {
        let args = message.content.substring(3).split(' ');
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
});

bot.login(auth.token);
