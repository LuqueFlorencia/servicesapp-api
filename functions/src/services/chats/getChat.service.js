const repository = require("../../repositories/chat.repository");

async function getChat(req, res) {
    try {
        const { chatId } = req.params;
        if (!chatId) return res.status(400).json({ error: "chatId es requerido." });

        const chat = await repository.getChat(chatId);
        if (!chat) return res.status(404).json({ error: "Chat no encontrado." });

        return res.status(200).json(chat);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function getMessages(req, res) {
    try {
        const { chatId } = req.params;
        if (!chatId) return res.status(400).json({ error: "chatId es requerido." });

        const messages = await repository.getMessages(chatId);
        return res.status(200).json(messages);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { getChat, getMessages };
