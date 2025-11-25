// module/chats.js
require('../config/environment');

const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');

const { getSuccessResponseObject } = require('../src/utils/utils');
const { httpStatusCodes } = require('../src/utils/httpsStatusCode');

const { 
    validateBody,
    validateQuery,
    asyncHandler,
    jsonInvalidHandler,
    notFoundHandler,
    errorHandler
} = require('../src/utils/validate');

const {
    chatSchema,
    messageSchema
} = require('../src/services/chats/chat.schema');

const {
    createChat,
    createMessage,
    getChat,
    getMessages,
    linkChatToUser,
    updateChatLastMessage,
    updateMessageStatus
} = require('../src/services/chats/chat.service');

const { validateFirebaseIdToken } = require('../src/utils/middleware');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Crea un chat entre cliente y profesional
app.post(
    '/create',
    validateBody(chatSchema),
    asyncHandler(async (req, res) => {
        const chat = await createChat(req.body);

        return res.status(httpStatusCodes.created).json(
            getSuccessResponseObject(
                chat,
                httpStatusCodes.created,
                'Creado',
                'Chat creado correctamente.'
            )
        );
    })
);

// Obtiene los datos generales del chat
app.get(
    '/',
    validateQuery(
        require('joi').object({
            chatId: require('joi')
                .string()
                .required()
                .messages({ 'any.required': 'chatId es requerido' })
        })
    ),
    asyncHandler(async (req, res) => {
        const { chatId } = req.query;
        const data = await getChat(chatId);

        return res.status(httpStatusCodes.ok).json(
            getSuccessResponseObject(
                data,
                httpStatusCodes.ok,
                'OK',
                'Chat obtenido.'
            )
        );
    })
);

// obtiene todos los mensajes de un chat
app.get(
    '/messages',
    validateQuery(
        require('joi').object({
            chatId: require('joi')
                .string()
                .required()
                .messages({ 'any.required': 'chatId es requerido' })
        })
    ),
    asyncHandler(async (req, res) => {
        const { chatId } = req.query;
        const messages = await getMessages(chatId);

        return res.status(httpStatusCodes.ok).json(
            getSuccessResponseObject(
                messages,
                httpStatusCodes.ok,
                'OK',
                'Mensajes obtenidos.'
            )
        );
    })
);

// Crea un mensaje dentro de un chat existente
app.post(
    '/message',
    validateBody(messageSchema),
    asyncHandler(async (req, res) => {
        const msg = await createMessage(req.body);

        return res.status(httpStatusCodes.created).json(
            getSuccessResponseObject(
                msg,
                httpStatusCodes.created,
                'Creado',
                'Mensaje enviado.'
            )
        );
    })
);

// Actualiza el estado de un mensaje (sent → received → read)
app.patch(
    '/message/status',
    validateBody(
        require('joi').object({
            chatId: require('joi').string().required(),
            messageId: require('joi').string().required(),
            status: require('joi')
                .string()
                .valid('sent', 'received', 'read')
                .required()
        })
    ),
    asyncHandler(async (req, res) => {
        const updated = await updateMessageStatus(req.body);

        return res.status(httpStatusCodes.ok).json(
            getSuccessResponseObject(
                updated,
                httpStatusCodes.ok,
                'OK',
                'Estado de mensaje actualizado.'
            )
        );
    })
);

// Actualiza el lastMessage del chat
app.patch(
    '/lastMessage',
    validateBody(
        require('joi').object({
            chatId: require('joi').string().required(),
            text: require('joi').string().required(),
            timestamp: require('joi').number().required(),
            senderUid: require('joi').string().required(),
            status: require('joi')
                .string()
                .valid('sent', 'received', 'read')
                .required()
        })
    ),
    asyncHandler(async (req, res) => {
        const updated = await updateChatLastMessage(req.body);

        return res.status(httpStatusCodes.ok).json(
            getSuccessResponseObject(
                updated,
                httpStatusCodes.ok,
                'OK',
                'Último mensaje del chat actualizado.'
            )
        );
    })
);

// Guarda /users/{uid}/chats/{chatId} = true
app.post(
    '/link',
    validateBody(
        require('joi').object({
            uid: require('joi').string().required(),
            chatId: require('joi').string().required(),
        })
    ),
    asyncHandler(async (req, res) => {
        const linked = await linkChatToUser(req.body);

        return res.status(httpStatusCodes.ok).json(
            getSuccessResponseObject(
                linked,
                httpStatusCodes.ok,
                'OK',
                'Chat vinculado al usuario.'
            )
        );
    })
);

app.use(jsonInvalidHandler);
app.use(notFoundHandler);
app.use(errorHandler);

exports.endpoints = functions.https.onRequest(app);
