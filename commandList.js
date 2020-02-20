const setupAuth = require('./auth/setupAuth');

const listChannel = require('./action/setup/listChannel');
const addChannel = require('./action/setup/addChanel');
const addRole = require('./action/setup/addRole');

const playerInfo = require('./action/albion/player_info.js');
const guildInfo = require('./action/albion/guild_info.js');

module.exports = {
    'setup': {
        'Auth': async (message, args) => {return await setupAuth(message, args)},
        'readme': {
            'use': 'ax/setup help',
            'desc': 'Affiche l\'aide pour le setup'
        },
        'cmd': {
            'help': {
                'run': (bot, message, args) => {setupHelp(bot, message, args)},
                'readme': {
                    'use': 'ax/setup help',
                    'desc': 'Affiche cet aide'
                }
            },
            'listchannel':  {
                'run': (bot, message, args) => {listChannel(bot, message, args);},
                'readme': {
                    'use': 'ax/setup listchannel',
                    'desc': 'Affiche tous les channels enregistrés'
                }
            },
            'addchannel': {
                'run': (bot, message, args) => {addChannel(bot, message, args);},
                'readme': {
                    'use': 'ax/setup addchannel [type] [channel]',
                    'desc': 'Ajoute un channel aux restriction d\'une commande'
                }
            },
            'addrole': {
                'run': (bot, message, args) => {addRole(bot, message, args)},
                'readme': {
                    'use': 'ax/setup addRole [emote] [role]',
                    'desc': 'Ajoute un couple role / emote'
                }
            },
            'ping': {
                'run': (bot, message, args) => {message.channel.send('pong!');},
                'readme': {
                    'use': 'ax/setup ping',
                    'desc': 'pong'
                }
            }
        }
    },
    'albion': {
        'Auth': async (message, args) => {return true;},
        'readme': {
            'use': 'ax/albion help',
            'desc': 'Affiche l\'aide pour albion'
        },
        'cmd': {
            'help': {
                'run': (bot, message, args) => {albionHelp(bot, message, args)},
                'readme': {
                    'use': 'ax/albion help',
                    'desc': 'Affiche cet aide'
                }
            },
            'stat': {
                'run': (bot, message, args) => {playerInfo(bot, message, args);},
                'readme': {
                    'use': '-',
                    'desc': '-'
                }
            },
            'guilde': {
                'run': (bot, message, args) => {guildInfo(bot, message, args);},
                'readme': {
                    'use': '-',
                    'desc': '-'
                }
            }
        }
    }
}

//circular dependencies
const setupHelp = require('./action/setup/help');
const albionHelp = require('./action/albion/help');