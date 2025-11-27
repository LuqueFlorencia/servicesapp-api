const Joi = require("joi");

const appointmentSchema = Joi.object({
  categoria: Joi.string().required().messages({
    "any.required": "La categoría es requerida",
  }),
  servicio: Joi.string().required().messages({
    "any.required": "El servicio es requerido",
  }),
  fecha: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "La fecha debe tener formato YYYY-MM-DD",
    }),
  hora: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "La hora debe tener formato HH:MM",
    }),
  profesionalId: Joi.string().required().messages({
    "any.required": "El ID del profesional es requerido",
  }),
  ubicacion: Joi.string().optional().allow(""),
});

const updateAppointmentSchema = Joi.object({
  estado: Joi.string()
    .valid("pendiente", "confirmado", "rechazado", "completado", "cancelado")
    .required(),
  motivoCancelacion: Joi.string().optional().allow(""),
});

const updateAppointmentFullSchema = Joi.object({
  categoria: Joi.string().optional().messages({
    "string.empty": "La categoría no puede estar vacía",
  }),
  servicio: Joi.string().optional().messages({
    "string.empty": "El servicio no puede estar vacío",
  }),
  fecha: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .messages({
      "string.pattern.base": "La fecha debe tener formato YYYY-MM-DD",
    }),
  hora: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .optional()
    .messages({
      "string.pattern.base": "La hora debe tener formato HH:MM",
    }),
  profesionalId: Joi.string().optional().messages({
    "string.empty": "El ID del profesional no puede estar vacío",
  }),
  ubicacion: Joi.string().optional().allow(""),
  estado: Joi.string()
    .valid("pendiente", "confirmado", "rechazado", "completado", "cancelado")
    .optional(),
  motivoCancelacion: Joi.string().optional().allow(""),
}).min(1);

module.exports = {
  appointmentSchema,
  updateAppointmentSchema,
  updateAppointmentFullSchema,
};
