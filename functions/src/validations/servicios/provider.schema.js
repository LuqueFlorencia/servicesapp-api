const Joi = require('joi');
const { idRef } = require('../../../utils/joi.primitives');

const providersMapSchema = Joi.object()
  .pattern(idRef, Joi.boolean())
  .default({});

const providerPayloadSchema = Joi.object({
  proUid: idRef.required()
    .messages({ 'any.required': 'proUid es requerido.' }),
  active: Joi.boolean().default(true),
}).required();

const providerPatchPayloadSchema = Joi.object({
  active: Joi.boolean().required()
    .messages({ 'any.required': 'active es requerido.' }),
}).required();

const providerParamsSchema = Joi.object({
  categoryId: idRef.required()
    .messages({ 'any.required': 'categoryId es requerido.' }),
  serviceId: idRef.required()
    .messages({ 'any.required': 'serviceId es requerido.' }),
  proUid: idRef.required()
    .messages({ 'any.required': 'proUid es requerido.' }),
});

module.exports = {
  providersMapSchema,
  providerPayloadSchema,
  providerPatchPayloadSchema,
  providerParamsSchema,
};
