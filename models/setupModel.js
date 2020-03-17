const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const setupModel = new Schema({
    discordGuildId: {type: String},
    albionMention: {type: String},
    albionAnonChan: {type: String},
    albionAuthChan: [{type: String}],
    setupAuthChan: [{type: String}],
    listRole: [{
        emote: {type: String},
        role: {type: String}
    }],
    messRole: {type: String}
})

module.exports = Mongoose.model('Setup', setupModel);
