const Joi = require('joi');
const { nonEmptyString } = require('../../../utils/joi.primitives'); 

const serviceGalleryItemSchema = Joi.object({
  title: nonEmptyString.max(250).required()
    .messages({ 'any.required': 'El título de la imagen es requerido.' }),
  photoURL: nonEmptyString.uri().required()
    .messages({
      'string.uri': 'photoURL debe ser una URL válida.',
      'any.required': 'photoURL es requerido.',
    }),
});

const personalizeGalleryItemSchema = Joi.object({
  subtitle: nonEmptyString.max(250).required()
    .messages({ 'any.required': 'El subtítulo de la imagen es requerido.' }),
  photoURL: nonEmptyString.uri().required()
    .messages({
      'string.uri': 'photoURL debe ser una URL válida.',
      'any.required': 'photoURL es requerido.',
    }),
});

module.exports = {
  serviceGalleryItemSchema,
  personalizeGalleryItemSchema,
};
