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
  createdAt: Joi.number().integer().min(0).required().messages({
    "number.base": "createdAt debe ser un entero (timestamp ms).",
    "any.required": "createdAt es requerido.",
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

module.exports = {
  gallerySchema,
  galleriesMapSchema,
  galleryPayloadSchema,
  galleryPatchPayloadSchema,
};
