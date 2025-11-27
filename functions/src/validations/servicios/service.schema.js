const Joi = require("joi");
const { nonEmptyString, idRef } = require("../../validations/joi.primitives");

const { gallerySchema } = require("../servicios/gallery.schema");
const { reviewsMapSchema } = require("./review.schema");
// const { scheduleSchema } = require("./schedule/schedule.schema");
// const { appointmentsMapSchema } = require("./appointment/appointments.schema");

// params tipo /:categoryId
const categoryParamsSchema = Joi.object({
  categoryId: idRef
    .required()
    .messages({ "any.required": "categoryId es requerido." }),
});

// params tipo /:categoryId/:serviceId
const serviceParamsSchema = Joi.object({
  categoryId: idRef
    .required()
    .messages({ "any.required": "categoryId es requerido." }),
  serviceId: idRef
    .required()
    .messages({ "any.required": "serviceId es requerido." }),
});

// { proUid: true }
const providersSchema = Joi.object().pattern(idRef, Joi.boolean()).default({});

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
  galery: Joi.array().items(gallerySchema).default([]),
  providers: providersSchema,
  reviews: reviewsMapSchema,
  // schedule: scheduleSchema,
  // appointments: appointmentsMapSchema,
}).required();

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
  galery: Joi.array().items(gallerySchema).default([]),
  providers: providersSchema.optional(),
}).required();

const servicePatchSchema = Joi.object({
  title: nonEmptyString.max(250),
  photoURL: nonEmptyString.uri(),
  price: Joi.number().integer().min(0),
  active: Joi.boolean(),
  galery: Joi.array().items(gallerySchema),
  providers: providersSchema,
}).min(1);

const listServicesQuerySchema = Joi.object({
  active: Joi.boolean().truthy("true", "false").optional(),
  minPrice: Joi.number().integer().min(0).optional(),
  maxPrice: Joi.number().integer().min(0).optional(),
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
