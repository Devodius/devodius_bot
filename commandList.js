const setupAuth = require('./auth/setupAuth');

const listChannel = require('./action/setup/listChannel');
const addChannel = require('./action/setup/addChanel');
const addRole = require('./action/setup/addRole');
const rmRole = require('./action/setup/rmRole');
const setupBase = require('./action/setup/base');

const playerInfo = require('./action/albion/player_info.js');
const guildInfo = require('./action/albion/guild_info.js');
const albionCall = require('./action/albion/setupCall');
const albionDeleteCall = require('./action/albion/deleteCall');
const albionListCall = require('./action/albion/listCall');

module.exports = {
    'setup': {
        'Auth': async (setup, message, args) => {return await setupAuth(message, args)},
        'readme': {
            'use': 'ax/setup help',
            'desc': 'Affiche l\'aide pour le setup'
        },
        'cmd': {
            'help': {
                'run': (bot, setup, message, args) => {setupHelp(bot, message, args)},
                'readme': {
                    'use': 'ax/setup help',
                    'desc': 'Affiche cet aide'
                }
            },
            'base': {
                'run': (bot, setup, message, args) => {setupBase(bot, setup, message, args);},
                'readme': {
                    'use': 'ax/setup base',
                    'desc': 'Commence paramétrage de base'
                }
            },
            'listchannel':  {
                'run': (bot, setup, message, args) => {listChannel(bot, message, args);},
                'readme': {
                    'use': 'ax/setup listchannel',
                    'desc': 'Affiche tous les channels enregistrés'
                }
            },
            'addchannel': {
                'run': (bot, setup, message, args) => {addChannel(bot, message, args);},
                'readme': {
                    'use': 'ax/setup addchannel [type] [channel]',
                    'desc': 'Ajoute un channel aux restriction d\'une commande'
                }
            },
            'addrole': {
                'run': (bot, setup, message, args) => {addRole(bot, message, args)},
                'readme': {
                    'use': 'ax/setup addRole [emote] [role]',
                    'desc': 'Ajoute un couple role / emote'
                }
            },
            'rmrole': {
                'run': (bot, setup, message, args) => {rmRole(bot, message, args)},
                'readme': {
                    'use': 'ax/setup rmRole [emote / role]',
                    'desc': 'Retire un couple role / emote'
                }
            },
            'messagerole': {
                'run': (bot, setup, message, args) => {},
                'readme': {
                    'use': 'ax/setup messageRole [messageId]',
                    'desc': 'Choisi le message sur lequel afficher la selection de role'
                }
            },
            'ping': {
                'run': (bot, setup, message, args) => {message.channel.send('pong!');},
                'readme': {
                    'use': 'ax/setup ping',
                    'desc': 'pong'
                }
            }
        }
    },
    'albion': {
        'Auth': async (setup, message, args) => {return true;},
        'readme': {
            'use': 'ax/albion help',
            'desc': 'Affiche l\'aide pour albion'
        },
        'cmd': {
            'help': {
                'run': (bot, setup, message, args) => {albionHelp(bot, message, args)},
                'readme': {
                    'use': 'ax/albion help',
                    'desc': 'Affiche cet aide'
                }
            },
            'stat': {
                'run': (bot, setup, message, args) => {playerInfo(bot, message, args);},
                'readme': {
                    'use': '-',
                    'desc': '-'
                }
            },
            'guilde': {
                'run': (bot, setup, message, args) => {guildInfo(bot, message, args);},
                'readme': {
                    'use': '-',
                    'desc': '-'
                }
            },
            'setupcall': {
                'run': (bot, setup, message, args) => {albionCall.setup(bot, setup, message, args);},
                'readme': {
                    'use': 'ax/albion setupCall',
                    'desc': 'run call setup'
                }
            },
            'listcall': {
                'run': (bot, setup, message, args) => {albionListCall(bot, message, args);},
                'readme': {
                    'use': 'ax/albion listCall',
                    'desc': 'list all active call'
                }
            },
            'deletecall': {
                'run': (bot, setup, message, args) => {albionDeleteCall(bot, message, args)},
                'readme': {
                    'use': 'ax/albion deleteCall [messageId]',
                    'desc': 'delete call'
                }
            },
            'deleteallcall': {
                'run': (bot, setup, message, args) => {albionDeleteCall(bot, message, args, true)},
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