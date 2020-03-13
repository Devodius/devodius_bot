const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const callsModel = new Schema({
    leader: {type: String},
    activity: {type: String},
    description: {type: String},
    stuff: {type: String},
    zone: {type: String},
    meetingPoint: {type: String},
    time: {type: String},
    duration: {type: String},
    numPeople: {type: Number},
    people: [
        {
            discord: {type: String},
            display: {type: String},
            role: {type: String, enume: ['T', 'D', 'H']}
        }
    ],
    messId: {type: String},
    discordUser: {type: String},
    discordChannel: {type: String},
    discordGuild: {type: String},
    done: {type: Number, default: 0, min: 0, max: 10}
})

module.exports = Mongoose.model('Calls', callsModel);
