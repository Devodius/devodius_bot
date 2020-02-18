const Mongoose = require('mongoose');
const Role = require('../models/roleModel');

class RoleService {

    addRole(emote, roleToAdd) {
        return new Promise((resolve, reject) => {
            const newRole = new Role();
            newRole.emote = emote;
            newRole.role = roleToAdd;
            newRole.save((err, doc) => {
                if (err)
                    reject(err);
                resolve(doc);
            })
        })
    }

    getRole(emote) {
        return Role.findOne({emote}).exec()
    }

}

module.exports = new RoleService();