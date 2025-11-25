const createChat = require('./createChat.service');
const getChat = require('./getChat.service');
const linkChatToUser = require('./linkChatToUser.service');
const updateMessages = require('./updateMessages.service');

module.exports = {
    ...createChat,
    ...getChat,
    ...linkChatToUser,
    ...updateMessages,
};