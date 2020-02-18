const fs = require('fs');
const config = require('./config.json');

class chanelsUtils {

    defaultChanel = {'Albion': [], 'Setup': []};

    constructor() { }

    getChanel(type = undefined) {
        let chanels = this.defaultChanel;
        try {
            let rawData = fs.readFileSync(config.ChanelFile);
            chanels = Object.assign(chanels, JSON.parse(rawData));
        } catch (error) {
            console.log('File ' + config.ChanelFile + ' not valid');
            return undefined;
        }

        if (type === undefined)
            return chanels;
        return chanels[type];
    }

    addChanel(type, channelId, message = undefined) {
        let chanel = this.getChanel();

        console.log('to add: ' + channelId);
        if (message !== undefined && message.guild.channels.get(channelId) === undefined)
            throw 'Unknown chanel';
        if (chanel === undefined)
            chanel = this.defaultChanel;
        try {
            if (!chanel[type].includes(channelId))
                chanel[type].push(channelId);
        } catch(error) {
            throw 'Wrong type';
        }
        console.log('to save: ', chanel);
        let data = JSON.stringify(chanel);
        fs.writeFileSync(config.ChanelFile, data);
    }
}

module.exports = new chanelsUtils();
