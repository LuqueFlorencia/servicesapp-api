require("../config/environment");
const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");

const mw = require("../src/middlewares/middlewares");
const schema = require("../src/validations/schemas");
const controller = require("../src/controllers/controllers");

const app = express();



app.use(cors({ origin: true }));
app.use(express.json());

// Todas las rutas requieren autenticación
app.use(mw.validateFirebaseIdToken);

// 1. Crear turno
app.post(
  "/",
  mw.validateBody(schema.appointmentSchema),
  mw.asyncHandler(controller.createAppointment)
);

// 2. Obtener todos los turnos
app.get(
  "/",
  mw.validateQuery(schema.appointmentQuerySchema),
  mw.asyncHandler(controller.getAppointments)
);

// 3. Turnos de un dia especifico
app.get(
  "/daily",
  mw.validateQuery(schema.dailyAppointmentsSchema),
  mw.asyncHandler(controller.getDailyAppointments)
);

// 4. Buscar turnos por rango de fechas (SOLO ADMIN)
app.get(
  "/search/date-range",
  mw.requireAdmin,
  mw.validateQuery(schema.dateRangeSchema),
  mw.asyncHandler(controller.getAppointmentsByDateRange)
);

// 5. Obtener turnos del usuario logueado (mis turnos)
app.get(
  "/me/appointments",
  mw.validateQuery(schema.appointmentQuerySchema),
  mw.asyncHandler(controller.getMyAppointments)
);

// 6. Obtener un turno por ID
app.get(
  "/:appointmentId",
  mw.requireAdmin,
  mw.validateParams(schema.appointmentParamsSchema),
  mw.asyncHandler(controller.getAppointment)
);

// 7. Actualizar solo estado del turno
app.patch(
  "/:appointmentId",
  mw.validateParams(schema.appointmentParamsSchema),
  mw.validateBody(schema.updateAppointmentSchema),
  mw.asyncHandler(controller.updateAppointmentState)
);

// 8. Actualizar turno completo
app.put(
  "/:appointmentId",
  mw.validateParams(schema.appointmentParamsSchema),
  mw.validateBody(schema.updateAppointmentFullSchema),
  mw.asyncHandler(controller.updateAppointmentFull)
);

// 9. Borrado logico - usuario dueño (cancela turno)
app.delete(
  "/:appointmentId/cancel",
  mw.validateParams(schema.appointmentParamsSchema),
  mw.asyncHandler(controller.deleteAppointmentLogical)
);

// 10. Borrado fisico - solo admin (elimina definitivamente)
app.delete(
  "/:appointmentId",
  mw.validateParams(schema.appointmentParamsSchema),
  mw.requireAdmin,
  mw.asyncHandler(controller.deleteAppointmentPhysical)
);

app.use(mw.jsonInvalidHandler);
app.use(mw.notFoundHandler);
app.use(mw.errorHandler);

exports.endpoints = functions.https.onRequest(app);
