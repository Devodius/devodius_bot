var Discord = require('discord.js');
var auth = require('./auth.json');

// Initialize Discord Bot
var bot = new Discord.Client();

bot.on('ready', function () {
    console.log('Connected');
    console.log('Logged in as: ' + bot.username + ' - (' + bot.id + ')');
});

bot.on('message', message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        console.log("Command received: " + cmd);
        switch(cmd) {
            // !ping
            case 'ping':
                message.channel.send('Pong!');
            break;
            // Just add any case commands if you want to..
         }
     }
});

bot.login(auth.token);
