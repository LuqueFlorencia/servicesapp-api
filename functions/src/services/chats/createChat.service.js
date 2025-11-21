const { chatSchema, messageSchema } = require("./chat.schema");
const repository = require("../../repositories/chat.repository");
const { v4: uuid } = require("uuid");

/*
    req.body.value: {
        proUid: "...",
        clientUid: "...",
        lastMessage: { optional },
        createdAt: timestamp
    }
*/
async function createChat(req, res) {
    try {
        const { error, value } = chatSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { proUid, clientUid, lastMessage, createdAt } = value;

        // Evitando duplicados
        const chatId = proUid > clientUid
                ? `${proUid}_${clientUid}`
                : `${clientUid}_${proUid}`;

        const data = {
            proUid,
            clientUid,
            lastMessage: lastMessage || null,
            createdAt
        };

        const result = await repository.createChat(chatId, data);

        return res.status(201).json(result);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


/*
    req.body.value: {
        chatId: "...",
        senderUid: "...",
        receiverUid: "...",
        text: "...",
        timestamp: number,
        status: "sent"|"received"|"read"
    }
 */
async function createMessage(req, res) {
    try {
        const { chatId, ...msg } = req.body;
        if (!chatId) return res.status(400).json({ error: "chatId es requerido." });

        const { error, value } = messageSchema.validate(msg);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const messageId = uuid();
        const result = await repository.createMessage(chatId, messageId, value);

        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { createChat, createMessage };