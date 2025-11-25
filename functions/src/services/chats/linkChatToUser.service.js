const repository = require("../../repositories/chat.repository");

async function linkChatToUser(req, res) {
    try {
        const { uid, chatId } = req.body;

        if (!uid || !chatId) return res.status(400).json({ error: "uid y chatId son requeridos." });

        const linked = await repository.linkChatToUser(uid, chatId);
        return res.status(200).json({ linked });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { linkChatToUser };
