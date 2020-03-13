const Mongoose = require('mongoose');
const Calls = require('../models/callModel');

class CallsService {

    addCall(call) {
        return new Promise((resolve, reject) => {
            const newCall = new Calls();
            newCall.leader = call.leader;
            newCall.activity = call.activity;
            newCall.description = call.description;
            newCall.stuff = call.stuff;
            newCall.zone = call.zone;
            newCall.meetingPoint = call.meetingPoint;
            newCall.time = call.time;
            newCall.duration = call.duration;
            newCall.numPeople = call.numPeople;
            newCall.discordUser = call.discordUser;
            newCall.discordChannel = call.discordChannel;
            newCall.discordGuild = call.discordGuild;
            newCall.save((err, doc) => {
                if (err)
                    reject(err);
                resolve(doc);
            })
        })
    }

    updateCall(callId, modid) {
        return new Promise ((resolve, reject) => {
            Calls.findByIdAndUpdate(callId, modid, (error, doc) => {
            if (error)
                reject(error);
            resolve(doc);
          });
        })
    }

    getCallById(callId) {
        return new Promise((resolve, reject) => {
            Calls.findById(callId, (err, call) => {
                if (err)
                    reject(err);
                resolve(call);
            })
        })
    }

    getCallByMessId(messId) {
        return new Promise((resolve, reject) => {
            Calls.findOne({messId}, (err, call) => {
                if (err)
                    reject(err);
                resolve(call);
            })
        })
    }

    getCallValidByuser(discordUser) {
        return new Promise((resolve, reject) => {
            Calls.findOne({discordUser, done: {$ne: 10}}, (err, call) => {
                if (err)
                    reject(err);
                resolve(call);
            })
        })
    }

    getAllDone() {
        return new Promise((resolve, reject) => {
            Calls.find({done: 10}, (err, calls) => {
                if (err)
                    reject(err);
                resolve(calls);
            })
        })
    }

    getDone(discordGuild) {
        return new Promise((resolve, reject) => {
            Calls.find({done: 10, discordGuild}, (err, calls) => {
                if (err)
                    reject(err);
                resolve(calls);
            })
        })
    }

    deleteById(callId) {
        return new Promise((resolve, reject) => {
            Calls.findByIdAndDelete(callId, (err, res) => {
                if (err)
                    reject(err);
                resolve();
            })
        })
    }

    deleteByMessId(messId) {
        return new Promise((resolve, reject) => {
            Calls.findOneAndDelete({messId}, (err, res) => {
                if (err)
                    reject(err);
                resolve();
            })
        })
    }

    deleteAll(discordGuild) {
        return new Promise((resolve, reject) => {
            Calls.deleteMany({discordGuild}, (err, res) => {
                if (err)
                    reject(err);
                resolve();
            })
        })
    }
    
}

module.exports = new CallsService();
