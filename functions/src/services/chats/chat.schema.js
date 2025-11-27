const Joi = require('joi');

const messageSchema = Joi.object({
    senderUid: Joi.string().required(),
    receiverUid: Joi.string().required(),
    text: Joi.string().min(1).max(2000).required(),
    timestamp: Joi.number().required(),
    status: Joi.string()
        .valid("sent","received","read")
        .required()
        .messages({ 'any.only':'Estado inválido.' })
});

const chatSchema = Joi.object({
    proUid: Joi.string().required(),
    clientUid: Joi.string().required(),
    lastMessage: Joi.object({
        text: Joi.string().required(),
        timestamp: Joi.number(),
        senderUid: Joi.string(),
        status: Joi.string()
            .valid("sent","received","read")
            .required()
            .messages({ 'any.only':'Estado inválido.' })
    }),
    createdAt: Joi.number().required()
}).unknown(false);

module.exports =  { chatSchema, messageSchema }