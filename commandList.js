const setupAuth = require('./auth/setupAuth');

const listChannel = require('./action/setup/listChannel');
const addChannel = require('./action/setup/addChanel');
const addRole = require('./action/setup/addRole');
const rmRole = require('./action/setup/rmRole');

const playerInfo = require('./action/albion/player_info.js');
const albionCall = require('./action/albion/setupCall');
const albionDeleteCall = require('./action/albion/deleteCall');

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
            'rmrole': {
                'run': (bot, message, args) => {rmRole(bot, message, args)},
                'readme': {
                    'use': 'ax/setup rmRole [emote / role]',
                    'desc': 'Retire un couple role / emote'
                }
            },
            'messagerole': {
                'run': (bot, message, args) => {},
                'readme': {
                    'use': 'ax/setup messageRole [messageId]',
                    'desc': 'Choisi le message sur lequel afficher la selection de role'
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
            'setupcall': {
                'run': (bot, message, args) => {albionCall.setup(bot, message, args)},
                'readme': {
                    'use': 'ax/albion setupCall',
                    'desc': 'run call setup'
                }
            },
            'deletecall': {
                'run': (bot, message, args) => {albionDeleteCall(bot, message, args)},
                'readme': {
                    'use': 'ax/albion deleteCall [messageId]',
                    'desc': 'delete call'
                }
            },
            'deleteallcall': {
                'run': (bot, message, args) => {albionDeleteCall(bot, message, args, true)},
                'readme': {
                    'use': 'ax/albion deleteAllCall',
                    'desc': 'delete all call'
                }
            }
        }
    }
}

//circular dependencies
const setupHelp = require('./action/setup/help');
const albionHelp = require('./action/albion/help');