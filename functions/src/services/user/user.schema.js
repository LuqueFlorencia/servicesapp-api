const Joi = require('joi');

const personalSchema = Joi.object({
    displayName: Joi.string().max(250).required()
        .messages({ 'any.required': 'El nombre es requerido.' }),
    photoURL: Joi.string().uri()
        .default('https://cdn.pixabay.com/photo/2016/12/02/16/35/picture-frame-1878069_640.jpg'),
    address: Joi.string().max(250).required()
        .messages({ 'any.required': 'La dirección es requerida.' }),
    city: Joi.string().max(120).required()
        .messages({ 'any.required': 'La ciudad es requerida.' }),
    province: Joi.string().max(120).required()
        .messages({ 'any.required': 'La provincia es requerida.' }),
    ratingAvg: Joi.number().min(0).max(10).precision(2)
        .messages({ 'number.base': 'ratingAvg debe ser numérico.' }),
    ratingCount: Joi.number().integer().min(0)
        .messages({ 'number.base': 'ratingCount debe ser numérico entero.' }),
}).required();

const premiumSchema = Joi.object({
    plan: Joi.string().valid('standard', 'plus').required()
        .messages({ 'any.only': 'plan debe ser standard o plus.' }),
    active: Joi.boolean().required(),
    paused: Joi.boolean().required(),
    since: Joi.number().integer().min(0).allow(null).required()
        .messages({ 'number.base': 'since debe ser un entero (timestamp ms).' }),
}).required();

const servicesSchema = Joi.object().pattern(
    Joi.string().min(1),
    Joi.object().pattern(Joi.string().min(1), Joi.valid(true))
);

const dniScalar = Joi.string()
    .pattern(/^[0-9]{7,8}$/)
    .required()
    .messages({
        'string.pattern.base': 'uid inválido (debe ser DNI numérico de 7 u 8 dígitos).',
        'any.required': 'uid es requerido.',
    });

const uidUserSchema = Joi.object({
    uid: dniScalar
});

const userPayloadSchema = Joi.object({
    role: Joi.string().valid('admin', 'client', 'pro').required()
        .messages({ 'any.only': 'role debe ser "admin", "client" o "pro".' }),
    email: Joi.string().lowercase().email().max(254).required(),
    is_deleted: Joi.boolean().optional().default(false),
    personal: personalSchema,
    premium: premiumSchema,
    services: servicesSchema.optional(),
});

const personalPatchSchema = Joi.object({
    displayName: Joi.string().max(250),
    photoURL: Joi.string().uri(),
    address: Joi.string().max(250),
    city: Joi.string().max(120),
    province: Joi.string().max(120),
}).min(1);

const rolePatchSchema = Joi.object({
    role: Joi.string().valid('admin', 'client', 'pro').required()
        .messages({ 'any.only': 'role debe ser "admin", "client" o "pro".' })
});

const listUsersQuerySchema = Joi.object({
    role: Joi.string().valid('admin', 'client', 'pro').optional(),
    city: Joi.string().max(120).optional(),
    province: Joi.string().max(120).optional(),
    active: Joi.boolean().truthy('true', 'false').optional(),
});

const statusPatchSchema = Joi.object({
    is_deleted: Joi.boolean().required()
        .messages({ 'any.required': 'is_deleted es requerido.' })
});


const updateProfileSchema = Joi.object({
    personal: personalSchema,
    premium: premiumSchema.optional(),
    services: servicesSchema.optional(),
});

module.exports = { 
    uidUserSchema,
    userPayloadSchema, 
    personalPatchSchema,
    rolePatchSchema,
    listUsersQuerySchema,
    statusPatchSchema,
    updateProfileSchema,  
};