const repository = require("../../repositories/appointment.repository");
const { ResourceNotFoundError } = require("../../utils/errores");

// --- Obtener múltiples turnos ---
async function getAppointments(req, res) {
  const { tipo, usuarioId, profesionalId, estado } = req.query;
  const filters = { tipo, usuarioId, profesionalId, estado };

  // Obtener el rol real desde la base de datos
  let userRole = "client";

  if (req.user && req.user.uid) {
    try {
      const userRepository = require("../../repositories/user/user.repository");
      const userData = await userRepository.getUserDataId(req.user.uid);
      userRole = userData.role;
    } catch (error) {
      userRole = "client";
    }
  }

  // CREAR OBJETO USER PARA PASAR AL REPOSITORY
  const userForRepository = {
    uid: req.user?.uid,
    role: userRole,
  };

  // PASAR EL USER AL REPOSITORY
  let appointments = await repository.getAppointments(
    filters,
    userForRepository
  );

  return appointments;
}

// --- Obtener un turno por ID ---
async function getAppointmentById(req, res) {
  const appointmentId = req.params.appointmentId;

  const appointment = await repository.getAppointmentById(appointmentId);

  if (!appointment) {
    throw new ResourceNotFoundError(
      `No se encontró el turno con ID: ${appointmentId}`
    );
  }

  // Obtener el rol real desde la base de datos
  let userRole = "client";
  if (req.user && req.user.uid) {
    try {
      const userRepository = require("../../repositories/user/user.repository");
      const userData = await userRepository.getUserDataId(req.user.uid);
      userRole = userData.role;
    } catch (error) {
      userRole = "client";
    }
  }

  // Solo admin puede ver turnos eliminados
  if ((!req.user || userRole !== "admin") && appointment.is_deleted === true) {
    throw new ResourceNotFoundError(
      `No se encontró el turno con ID: ${appointmentId}`
    );
  }

  return appointment;
}

module.exports = { getAppointments, getAppointmentById };
