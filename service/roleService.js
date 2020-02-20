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

    removeRole(identifiant) {
        return new Promise((resolve, reject) => {
            Role.find({emote: identifiant}, (err, res) => {
                if (!err && res.length) {
                    Role.findOneAndDelete({emote: identifiant}, (err, res) => {
                        if (err)
                            reject(err);
                        resolve(true);
                    })
                } else {
                    Role.find({role: identifiant}, (err, res) => {
                        if (!err && res.length) {
                            Role.findOneAndDelete({role: identifiant}, (err, res) => {
                                if (err)
                                    reject(err);
                                resolve(true);
                            })
                        } else
                            reject('Not Found');
                    })
                }

            })
        })
    }

}

module.exports = new RoleService();