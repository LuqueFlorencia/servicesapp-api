const Joi = require('joi');

const ratingProfessionalSchema = Joi.object({
    score: Joi.number().min(0).max(10).required()
        .messages({
            'number.base': 'score debe ser numérico.',
            'number.min': 'score no puede ser menor a 0.',
            'number.max': 'score no puede ser mayor a 10.',
            'any.required': 'score es requerido.',}),
}).required();

const listProfessionalsQuerySchema = Joi.object({
    city: Joi.string().max(120).optional(),
    province: Joi.string().max(120).optional(),
    minRating: Joi.number().min(0).max(10).optional(),
    minRatingCount: Joi.number().integer().min(0).optional(),
    categoryId: Joi.string().min(1).optional(),
    serviceId: Joi.string().min(1).optional(),
});

module.exports = { ratingProfessionalSchema, listProfessionalsQuerySchema };