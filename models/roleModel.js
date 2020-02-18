const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Objectd = Mongoose.Types.ObjectId;

const roleSchema = new Schema({
    emote: {type: String, unique: true, required: true},
    role: {type: String, unique: true, required: true}
})

module.exports = Mongoose.model('Roles', roleSchema);
