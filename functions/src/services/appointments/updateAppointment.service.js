const repository = require("../../repositories/appointment.repository");

async function updateAppointmentState(req, res) {
  try {
    const appointmentId = req.params.appointmentId;
    const { estado, motivoCancelacion } = req.body;

    const existing = await repository.getAppointmentById(appointmentId);
    if (!existing) {
      throw new Error("Turno no encontrado");
    }

    const userId = req.user.uid;
    const isOwner = existing.usuarioId === userId;
    const isProfessional = existing.profesionalId === userId;

    const professionalAllowed = ["confirmado", "rechazado", "completado"];

    if (estado === "cancelado" && !isOwner) {
      throw new Error("Solo el usuario puede cancelar el turno");
    }

    if (professionalAllowed.includes(estado) && !isProfessional) {
      throw new Error("Solo el profesional puede realizar esta acción");
    }

    const updateData = {
      estado,
      ultimaActualizacion: new Date().toISOString(),
    };

    if (estado === "confirmado" && existing.estado !== "confirmado") {
      updateData.fechaConfirmacion = new Date().toISOString();
    }

    if (estado === "completado" && existing.estado !== "completado") {
      updateData.fechaCompletado = new Date().toISOString();
    }

    if (motivoCancelacion) {
      updateData.motivoCancelacion = motivoCancelacion;
    }

    const updated = await repository.updateAppointment(
      appointmentId,
      updateData
    );

    return updated;
  } catch (err) {
    throw err;
  }
}

async function updateAppointmentFull(req, res) {
  try {
    const appointmentId = req.params.appointmentId;

    const existing = await repository.getAppointmentById(appointmentId);
    if (!existing) {
      throw new Error("Turno no encontrado");
    }

    const updateData = {
      ...req.body,
      ultimaActualizacion: new Date().toISOString(),
    };


    const updated = await repository.updateAppointment(
      appointmentId,
      updateData
    );

    return updated;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  updateAppointmentState,
  updateAppointmentFull,
};
