const Discord = require('discord.js');
const auth = require('./auth.json');
const config = require('./config.json');
const chanelsUtils = require('./chanelsUtils');

const chanelSetup = require('./chanelsAct/setup');

// Initialize Discord Bot
var bot = new Discord.Client();

bot.on('ready', function () {
    console.log('Connected');
    console.log('Logged in as: ' + bot.username + ' - (' + bot.id + ')');
});

bot.on('message', message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.content.substring(0, 3) == 'ax/') {
        var args = message.content.substring(3).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        console.log("Command received: " + cmd);
        switch(cmd) {
            // !ping
            case 'ping':
                message.channel.send('Pong!');
            break;
            case 'setup':
                let limitedChanel = chanelsUtils.getChanel('Setup');
                if (limitedChanel === undefined || limitedChanel.length === 0 || limitedChanel.includes(message.channel.id)) {
                    chanelSetup.command(bot, message, args);
                }
            break;
            // Just add any case commands if you want to..
         }
     }
});

bot.login(auth.token);
