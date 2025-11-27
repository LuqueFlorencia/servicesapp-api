const Joi = require("joi");

const appointmentQuerySchema = Joi.object({
  tipo: Joi.string().valid("usuario", "profesional"),
  usuarioId: Joi.string(),
  profesionalId: Joi.string(),
  estado: Joi.string().valid(
    "pendiente",
    "confirmado",
    "rechazado",
    "en_proceso",
    "completado",
    "cancelado"
  ),
});

const appointmentParamsSchema = Joi.object({
  appointmentId: Joi.string().required(),
});

const dateRangeSchema = Joi.object({
  fechaDesde: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  fechaHasta: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  estado: Joi.string().valid(
    "pendiente",
    "confirmado",
    "rechazado",
    "en_proceso",
    "completado",
    "cancelado"
  ),
  profesionalId: Joi.string(),
});

const dailyAppointmentsSchema = Joi.object({
  fecha: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  tipo: Joi.string().valid("usuario", "profesional").optional(), // Para filtrar por perspectiva
});

module.exports = {
  appointmentQuerySchema,
  appointmentParamsSchema,
  dateRangeSchema,
  dailyAppointmentsSchema,
};
