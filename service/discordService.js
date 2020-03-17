class DiscordService {

    getRoleId(mention) {
        const matches = mention.match(/^<@!?(\d+)>$/);

        if (!matches)
            return undefined;
        return matches[1];
    }

    getRoleMention(roleId) {
        return "<@!" + roleId + ">";
    }

    getUserID(mention) {
        const matches = mention.match(/^<@?(\d+)>!*$/);

        if (!matches)
            return undefined;
        return matches[1];
    }

    getUserMention(userId) {
        return "<@" + userId + ">";
    }

    getChannelID(mention) {
        const matches = mention.match(/^<#?(\d+)>$/);

        if (!matches)
            return undefined;
        return matches[1];
    }

    getChannelMention(channelId) {
        return "<#" + channelId + ">";
    }

}

module.exports = new DiscordService();
