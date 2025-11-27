const repository = require("../../repositories/appointment.repository");

// =========================================================
//  UPDATE SOLO DEL ESTADO
// =========================================================
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

    // Usuario solo puede cancelar
    if (estado === "cancelado" && !isOwner) {
      throw new Error("Solo el usuario puede cancelar el turno");
    }

    // Profesional maneja el resto de los estados
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

// =========================================================
//  UPDATE COMPLETO (cualquier campo del turno)
// =========================================================
async function updateAppointmentFull(req, res) {
  try {
    const appointmentId = req.params.appointmentId;

    console.log("=== DEBUG UPDATE FULL SERVICE ===");
    console.log("req.body EN SERVICE:", req.body);
    console.log("Type of req.body:", typeof req.body);
    console.log("Keys in req.body:", Object.keys(req.body));

    // Verificar si el body está corrupto
    if (typeof req.body === "string") {
      console.log("❌ req.body es string en lugar de objeto");
      try {
        req.body = JSON.parse(req.body);
      } catch (parseError) {
        throw new Error("Body JSON inválido: " + parseError.message);
      }
    }

    const existing = await repository.getAppointmentById(appointmentId);
    if (!existing) {
      throw new Error("Turno no encontrado");
    }

    const updateData = {
      ...req.body,
      ultimaActualizacion: new Date().toISOString(),
    };

    console.log("updateData final:", updateData);
    console.log("Keys in updateData:", Object.keys(updateData));

    const updated = await repository.updateAppointment(
      appointmentId,
      updateData
    );

    return updated;
  } catch (err) {
    throw err;
  }
}

// =========================================================
//  EXPORTS
// =========================================================
module.exports = {
  updateAppointmentState,
  updateAppointmentFull,
};
