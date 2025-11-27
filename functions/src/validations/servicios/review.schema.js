const Joi = require("joi");
const { idRef } = require("../../validations/joi.primitives");

const reviewSchema = Joi.object({
  clientUid: idRef
    .required()
    .messages({ "any.required": "clientUid es requerido." }),
  proUid: idRef.required().messages({ "any.required": "proUid es requerido." }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "rating debe ser numérico entero.",
    "number.min": "rating mínimo 1.",
    "number.max": "rating máximo 5.",
    "any.required": "rating es requerido.",
  }),
  comment: Joi.string().max(1000).allow(""),
  createdAt: Joi.number().integer().min(0).required().messages({
    "number.base": "createdAt debe ser un entero (timestamp ms).",
    "any.required": "createdAt es requerido.",
  }),
}).required();

const reviewsMapSchema = Joi.object().pattern(idRef, reviewSchema).default({});

const reviewPayloadSchema = Joi.object({
  clientUid: idRef
    .required()
    .messages({ "any.required": "clientUid es requerido." }),
  proUid: idRef.required().messages({ "any.required": "proUid es requerido." }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "rating debe ser numérico entero.",
    "number.min": "rating mínimo 1.",
    "number.max": "rating máximo 5.",
    "any.required": "rating es requerido.",
  }),
  comment: Joi.string().max(1000).allow(""),
}).required();

const reviewPatchSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  comment: Joi.string().max(1000).allow(""),
}).min(1);

const reviewParamsSchema = Joi.object({
  categoryId: idRef
    .required()
    .messages({ "any.required": "categoryId es requerido." }),
  serviceId: idRef
    .required()
    .messages({ "any.required": "serviceId es requerido." }),
  reviewId: idRef
  .required()
  .messages({ "any.required": "reviewId es requerido." }),
});

module.exports = {
  reviewSchema,
  reviewsMapSchema,
  reviewPayloadSchema,
  reviewPatchSchema,
  reviewParamsSchema,
};
