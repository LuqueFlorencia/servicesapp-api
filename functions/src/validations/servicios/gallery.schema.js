const Joi = require("joi");
const { idRef } = require("../../validations/joi.primitives");

const gallerySchema = Joi.object({
  title: Joi.string()
    .max(250)
    .required()
    .messages({ "any.required": "title es requerido." }),
  photoURL: Joi.string().uri().required().messages({
    "string.uri": "photoURL debe ser una URL válida.",
    "any.required": "photoURL es requerido.",
  }),
}).required();

const galleriesMapSchema = Joi.object()
  .pattern(idRef, gallerySchema)
  .default({});

const galleryPayloadSchema = Joi.object({
  title: Joi.string()
    .max(250)
    .required()
    .messages({ "any.required": "title es requerido." }),
  photoURL: Joi.string().uri().required().messages({
    "string.uri": "photoURL debe ser una URL válida.",
    "any.required": "photoURL es requerido.",
  }),
}).required();

const galleryPatchPayloadSchema = Joi.object({
  title: Joi.string().max(250),
  photoURL: Joi.string().uri(),
}).min(1);

const galleryParamsSchema = Joi.object({
  categoryId: idRef
    .required()
    .messages({ "any.required": "categoryId es requerido." }),
  serviceId: idRef
    .required()
    .messages({ "any.required": "serviceId es requerido." }),
  galleryId: idRef
  .required()
  .messages({ "any.required": "categoryId es requerido." }),
});

module.exports = {
  gallerySchema,
  galleriesMapSchema,
  galleryPayloadSchema,
  galleryPatchPayloadSchema,
  galleryParamsSchema,
};
