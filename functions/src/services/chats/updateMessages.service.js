const repository = require("../../repositories/chat.repository");

async function updateMessageStatus(req, res) {
    try {
        const { chatId, messageId } = req.params;
        const { status } = req.body;

        if (!chatId || !messageId) return res.status(400).json({ error: "chatId y messageId son requeridos." });
        if (!status) return res.status(400).json({ error: "status es requerido." });

        const updated = await repository.updateMessageStatus(chatId, messageId, status);
        return res.status(200).json({ status: updated });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function updateChatLastMessage(req, res) {
    try {
        const { chatId } = req.params;
        const { lastMessage } = req.body;

        if (!chatId) return res.status(400).json({ error: "chatId es requerido." });
        if (!lastMessage) return res.status(400).json({ error: "lastMessage es requerido." });

        const updated = await repository.updateChatLastMessage(chatId, lastMessage);
        return res.status(200).json(updated);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { updateChatLastMessage, updateMessageStatus };