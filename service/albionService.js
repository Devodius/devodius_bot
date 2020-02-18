const request = require('request');
const Discord = require('discord.js');

class AlbionService {
    constructor() {}

    findplayer(name) {
        return new Promise ((resolve, reject) => {
            request('https://gameinfo.albiononline.com/api/gameinfo/search?q=' + name, { json: true }, (err, res, body) => {
                if (err)
                    reject('Request api fail');
                body = body.players;
                if (body.length === 0)
                    reject('Nothing found');
                resolve(body);
            });
        })
    }

    findfullplayer(playerId) {
        return new Promise ((resolve, reject) => {
            request('https://gameinfo.albiononline.com/api/gameinfo/players/' + playerId, { json: true }, (err, res, body) => {
                if (err)
                    reject('Request api fail');
                //console.log('body: ', body);
                if (body.length === 0)
                    reject('Nothing found');
                resolve(body);
            });
        })
    }
}

module.exports = new AlbionService();