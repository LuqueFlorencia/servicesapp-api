const { getSuccessResponseObject } = require("../utils/utils");
const { httpStatusCodes } = require("../utils/errores");
const appointmentService = require("../services/appointments/appointment.service");

// POST /appointments
async function createAppointment(req, res) {
  const data = await appointmentService.createAppointment(req, res);
  return res
    .status(httpStatusCodes.created)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.created,
        "Creado",
        "Turno creado correctamente."
      )
    );
}

// GET /appointments
async function getAppointments(req, res) {
  const data = await appointmentService.getAppointments(req, res);
  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Turnos obtenidos correctamente."
      )
    );
}

// GET /appointments/:appointmentId
async function getAppointment(req, res) {
  const data = await appointmentService.getAppointmentById(req, res);
  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Turno obtenido correctamente."
      )
    );
}

// PATCH /appointments/:appointmentId (solo estado)
async function updateAppointmentState(req, res) {
  const data = await appointmentService.updateAppointmentState(req, res);
  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Estado actualizado correctamente."
      )
    );
}

// PUT /appointments/:appointmentId (update completo)
async function updateAppointmentFull(req, res) {
  console.log("=== DEBUG CONTROLLER UPDATE FULL ===");
  console.log("req.body EN CONTROLLER:", req.body);
  console.log("Type of req.body:", typeof req.body);
  console.log("Keys in req.body:", Object.keys(req.body));

  const data = await appointmentService.updateAppointmentFull(req, res);
  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Turno actualizado correctamente."
      )
    );
}

// DELETE /appointments/:appointmentId/cancel (borrado lógico - usuario dueño)
async function deleteAppointmentLogical(req, res) {
  const data = await appointmentService.deleteAppointmentLogical(req, res);
  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Turno cancelado exitosamente."
      )
    );
}

// DELETE /appointments/:appointmentId (borrado físico - solo admin)
async function deleteAppointmentPhysical(req, res) {
  const data = await appointmentService.deleteAppointmentPhysical(req, res);
  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Turno eliminado físicamente exitosamente."
      )
    );
}

// GET /appointments/me/appointments (mis turnos)
async function getMyAppointments(req, res) {
  const data = await appointmentService.getMyAppointments(req, res);
  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Mis turnos obtenidos correctamente."
      )
    );
}

// GET /appointments/search/date-range (buscar por fechas)
async function getAppointmentsByDateRange(req, res) {
  const data = await appointmentService.getAppointmentsByDateRange(req, res);
  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Turnos por rango de fechas obtenidos correctamente."
      )
    );
}

async function getDailyAppointments(req, res) {
  const data = await appointmentService.getDailyAppointments(req, res);

  const message =
    data.count === 0
      ? `No se encontraron turnos para la fecha ${req.query.fecha}`
      : `Turnos del día ${req.query.fecha} obtenidos correctamente`;

  return res
    .status(httpStatusCodes.ok)
    .json(getSuccessResponseObject(data, httpStatusCodes.ok, "OK", message));
}

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointmentState,
  updateAppointmentFull,
  deleteAppointmentLogical,
  deleteAppointmentPhysical,
  getMyAppointments,
  getAppointmentsByDateRange,
  getDailyAppointments,
};
