const Joi = require('joi');

// String no vacío (trim)
const nonEmptyString = Joi.string().trim().min(1);

// Id entero positivo
const idRef = Joi.alternatives().try(
    Joi.number().integer().positive(),
    Joi.string().pattern(/^[A-Za-z0-9_-]{6,128}$/)
);

// Util para campos opcionalmente nulos o vacío → null
const nullableString = Joi.alternatives().try(Joi.string(), Joi.allow(null));

// Valida :id en params personalizado y numerico
const uidParamSchema = Joi.object({
    uid: Joi.number().integer().positive().required()
    .messages({
        'number.base': 'El identificador debe ser un número entero.',
        'number.integer': 'El identificador debe ser un número entero.',
        'number.positive': 'El identificador debe ser un número positivo.',
        'any.required': 'El identificador es obligatorio.',
    }),
});

// Valida :id en params del autogenerado por firebase
const firebaseUidParamSchema = Joi.object({
    uid: Joi.string()
        .pattern(/^[A-Za-z0-9_-]{6,128}$/)
        .required()
});

module.exports = { nonEmptyString, idRef, nullableString, uidParamSchema, firebaseUidParamSchema };