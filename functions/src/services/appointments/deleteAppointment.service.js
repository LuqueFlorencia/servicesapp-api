const repository = require("../../repositories/appointment.repository");
const userRepository = require("../../repositories/user/user.repository");

// BORRADO LÓGICO - Solo usuario dueño (para /cancel)
async function deleteAppointmentLogical(req, res) {
  try {
    const appointmentId = req.params.appointmentId;

    const existingAppointment = await repository.getAppointmentById(
      appointmentId
    );
    if (!existingAppointment) {
      throw new Error("Turno no encontrado");
    }

    const userId = req.user.uid;

    // Solo el usuario dueño puede hacer borrado lógico
    if (existingAppointment.usuarioId !== userId) {
      throw new Error("Solo el usuario que creó el turno puede cancelarlo");
    }

    // En lugar de borrar físicamente, hacemos eliminación lógica
    const updateData = {
      is_deleted: true,
      ultimaActualizacion: new Date().toISOString(),
    };

    const updatedAppointment = await repository.updateAppointment(
      appointmentId,
      updateData
    );

    return {
      success: true,
      message: "Turno cancelado exitosamente",
      data: updatedAppointment,
      type: "logical",
    };
  } catch (err) {
    throw err;
  }
}

// BORRADO FÍSICO - Solo admin (para DELETE normal)
async function deleteAppointmentPhysical(req, res) {
  try {
    const appointmentId = req.params.appointmentId;

    const existingAppointment = await repository.getAppointmentById(
      appointmentId
    );
    if (!existingAppointment) {
      throw new Error("Turno no encontrado");
    }

    const userId = req.user.uid;

    // OBTENER EL ROL DEL USUARIO USANDO EL REPOSITORY
    const userData = await userRepository.getUserDataId(userId);
    const userRole = userData.role;

    console.log("User ID:", userId);
    console.log("User Role:", userRole);

    // Solo admin puede hacer borrado físico
    if (userRole !== "admin") {
      throw new Error("No autorizado (se requiere rol admin)");
    }

    await repository.deleteAppointment(appointmentId);

    return {
      success: true,
      message: "Turno eliminado físicamente exitosamente",
      type: "physical",
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  deleteAppointmentLogical,
  deleteAppointmentPhysical,
};
