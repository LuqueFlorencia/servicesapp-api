const { db } = require("../utils/firebase.js");

async function createChat(chatId, data) {
    const ref = db.ref(`chats/${chatId}`);
    await ref.set(data);
    const snapshot = await ref.get();
    
    data = snapshot.once('value').val();
    return { chatId, data };
}

async function createMessage(chatId, messageId, messageData) {
    const ref = db.ref(`messages/${chatId}/${messageId}`);
    await ref.set(messageData);

    const snapshot = await ref.get();
    const data = snapshot.once('value').val();
    return { messageId, snapshot };
}

async function getChat(chatId) {
    const ref = db.ref(`chats/${chatId}`);
    const snapshot = await ref.get();
    return snapshot.exists() ? snapshot.val() : null;
}

async function getMessages(chatId) {
    const ref = db.ref(`messages/${chatId}`);
    const snapshot = await ref.get();
    return snapshot.exists() ? snapshot.val() : {};
}

// linkea cada usuario con los chats en donde participa.
async function linkChatToUser(uid, chatId) {
    const ref = db.ref(`userChats/${uid}/${chatId}`);
    await ref.set(true);
    return true;
}

async function updateMessageStatus(chatId, messageId, status) {
    const ref = db.ref(`messages/${chatId}/${messageId}/status`);
    await ref.set(status);
    return status;
}


// update lastMessage
async function updateChatLastMessage(chatId, lastMessage) {
    const ref = db.ref(`chats/${chatId}/lastMessage`);
    await ref.set(lastMessage);
    return lastMessage;
}


module.exports = {
    createChat,
    createMessage,
    getChat,
    getMessages,
    linkChatToUser,
    updateMessageStatus,
    updateChatLastMessage
};
