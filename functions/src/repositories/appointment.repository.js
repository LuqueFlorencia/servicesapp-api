const { db } = require("../utils/firebase");
const { ResourceNotFoundError } = require("../utils/errores");

const APPOINTMENTS_ROOT = "turnos";

async function createAppointment(appointmentId, appointmentData) {
  if (typeof appointmentId !== "string") {
    throw new Error(
      `appointmentId debe ser string, recibido: ${typeof appointmentId}`
    );
  }

  const ref = db.ref(`${APPOINTMENTS_ROOT}/${appointmentId}`);

  const completeAppointmentData = {
    ...appointmentData,
    is_deleted:
      appointmentData.is_deleted !== undefined
        ? appointmentData.is_deleted
        : false,
  };

  await ref.set(completeAppointmentData);

  const snapshot = await ref.once("value");
  const result = snapshot.val();
  return { ...result, id: appointmentId };
}

async function getAppointmentById(appointmentId) {
  const ref = db.ref(`${APPOINTMENTS_ROOT}/${appointmentId}`);
  const snapshot = await ref.once("value");
  const appointment = snapshot.val();

  if (!appointment) {
    throw new ResourceNotFoundError(
      `No se encontró el turno con ID: ${appointmentId}`
    );
  }

  return { ...appointment, id: appointmentId };
}

async function getAppointments(filters = {}, user) {
  const ref = db.ref(APPOINTMENTS_ROOT);
  const snapshot = await ref.once("value");
  const appointmentsObj = snapshot.val() || {};

  let appointments = Object.entries(appointmentsObj).map(
    ([id, appointment]) => ({ ...appointment, id })
  );

  // Filtrado por role - Solo admin puede ver eliminados
  if (!user || user.role !== "admin") {
    appointments = appointments.filter((apt) => apt.is_deleted !== true);
  }

  if (filters.usuarioId) {
    appointments = appointments.filter(
      (apt) => apt.usuarioId === filters.usuarioId
    );
  }

  if (filters.profesionalId) {
    appointments = appointments.filter(
      (apt) => apt.profesionalId === filters.profesionalId
    );
  }

  if (filters.estado) {
    appointments = appointments.filter((apt) => apt.estado === filters.estado);
  }

  if (filters.tipo === "usuario" && filters.usuarioId) {
    appointments = appointments.filter(
      (apt) => apt.usuarioId === filters.usuarioId
    );
  } else if (filters.tipo === "profesional" && filters.profesionalId) {
    appointments = appointments.filter(
      (apt) => apt.profesionalId === filters.profesionalId
    );
  }

  return appointments;
}

async function updateAppointment(appointmentId, updateData) {

  const ref = db.ref(`${APPOINTMENTS_ROOT}/${appointmentId}`);


  Object.keys(updateData).forEach((key) => {
    console.log(`- ${key}: ${updateData[key]}`);
  });

  await ref.update(updateData);

  const snapshot = await ref.once("value");
  const result = snapshot.val();


  return { ...result, id: appointmentId };
}

async function deleteAppointment(appointmentId) {
  const ref = db.ref(`${APPOINTMENTS_ROOT}/${appointmentId}`);
  await ref.remove();

  return { success: true };
}

module.exports = {
  createAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
