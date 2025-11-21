const Joi = require('joi');

const categorySchema = Joi.object({
    title: Joi.string()
        .pattern(/^[a-záéíóúñ]{3,}( [a-záéíóúñ]{2,})*$/i)
        .required()
        .messages({ 'string.pattern.base':'Solamente palabras (sin números) separados por un solo espacio'}),
    icon: Joi.string().required()
});

module.exports = { categorySchema }