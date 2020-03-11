const Discord = require('discord.js');

module.exports = async (message, args) => {
    let member;

    if (!message.guild)
        return false;
    try {
        member = await message.guild.member(message.author);
    } catch (error) {
        console.log('setupAuthError: ', error);
        return false;
    }
    if (member.hasPermission('ADMINISTRATOR', false, true, true))
        return true;
    return false;
}