const { appointmentSchema } = require("./appointment.schema");
const repository = require("../../repositories/appointment.repository");
const { v4: uuid } = require("uuid");

async function createAppointment(req, res) {
  try {
    const { error, value } = appointmentSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const appointmentId = uuid();

    const userId = req.user.uid;

    const timestamp = new Date(`${value.fecha}T${value.hora}`).getTime();

    const newAppointment = {
      categoria: value.categoria,
      servicio: value.servicio,
      fecha: value.fecha,
      hora: value.hora,
      timestamp: timestamp,
      usuarioId: userId,
      profesionalId: value.profesionalId,
      estado: "pendiente",
      fechaCreacion: new Date().toISOString(),
      ultimaActualizacion: new Date().toISOString(),
      ubicacion: value.ubicacion || "",
      fechaConfirmacion: null,
      fechaCompletado: null,
      is_deleted: false,
    };

    const createdAppointment = await repository.createAppointment(
      appointmentId,
      newAppointment
    );

    return createdAppointment;
  } catch (err) {
    throw err;
  }
}

module.exports = { createAppointment };
