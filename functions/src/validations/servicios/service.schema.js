const Joi = require("joi");
const { nonEmptyString, idRef } = require("../../validations/joi.primitives");

const { gallerySchema } = require("../servicios/gallery.schema");
const { reviewsMapSchema } = require("./review.schema");

// params /:categoryId
//chequea que el parámetro de la ruta sea válido segun idRef
const categoryParamsSchema = Joi.object({
  categoryId: idRef
    .required()
    .messages({ "any.required": "categoryId es requerido." }),
});

// params /:categoryId/:serviceId
//chequea que el parámetro de la ruta sea válido segun idRef
const serviceParamsSchema = Joi.object({
  categoryId: idRef
    .required()
    .messages({ "any.required": "categoryId es requerido." }),
  serviceId: idRef
    .required()
    .messages({ "any.required": "serviceId es requerido." }),
});

//profesionales que ofrecen el servicio, con boolean, si no hay ninguno se inicializa vacío
const providersSchema = Joi.object().pattern(idRef, Joi.boolean()).default({});

//esquema de servicio (PLANTILLA OFICIAL)
const serviceSchema = Joi.object({
  title: nonEmptyString
    .max(250)
    .required()
    .messages({ "any.required": "title es requerido." }),
  photoURL: nonEmptyString.uri().required().messages({
    "string.uri": "photoURL debe ser una URL válida.",
    "any.required": "photoURL es requerido.",
  }),
  price: Joi.number().integer().min(0).required().messages({
    "number.base": "price debe ser numérico entero.",
    "any.required": "price es requerido.",
  }),
  active: Joi.boolean().required(),
  createdAt: Joi.number().integer().min(0).required().messages({
    "number.base": "createdAt debe ser un entero (timestamp ms).",
    "any.required": "createdAt es requerido.",
  }),
  gallery: Joi.array().items(gallerySchema).default([]),
  providers: providersSchema,
  reviews: reviewsMapSchema,
}).required();

//cuerpo POST de servicio
const servicePayloadSchema = Joi.object({
  title: nonEmptyString
    .max(250)
    .required()
    .messages({ "any.required": "title es requerido." }),
  photoURL: nonEmptyString.uri().required().messages({
    "string.uri": "photoURL debe ser una URL válida.",
    "any.required": "photoURL es requerido.",
  }),
  price: Joi.number().integer().min(0).required().messages({
    "number.base": "price debe ser numérico entero.",
    "any.required": "price es requerido.",
  }),
  active: Joi.boolean().default(true),
  gallery: Joi.array().items(gallerySchema).default([]),
  providers: providersSchema.optional(),
}).required();


//ejemplo de PATCH para un servicio, con validación para que no intente actualizar sin mandar nada
const servicePatchSchema = Joi.object({
  title: nonEmptyString.max(250),
  photoURL: nonEmptyString.uri(),
  price: Joi.number().integer().min(0),
  active: Joi.boolean(),
  gallery: Joi.array().items(gallerySchema),
  providers: providersSchema,
}).min(1);

//esquema para verificar los params de una query, en este caso, listar por max y min precio
//truthy convierte los strings true o false en, efectivamente, booleans
const listServicesQuerySchema = Joi.object({
  active: Joi.boolean().truthy("true", "false").optional(),
  minPrice: Joi.number().integer().min(1).optional(),
  maxPrice: Joi.number().integer().min(1).optional(),
});

module.exports = {
  categoryParamsSchema,
  serviceParamsSchema,
  providersSchema,
  serviceSchema,
  servicePayloadSchema,
  servicePatchSchema,
  listServicesQuerySchema,
};
