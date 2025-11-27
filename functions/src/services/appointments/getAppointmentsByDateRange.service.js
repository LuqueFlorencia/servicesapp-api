const repository = require("../../repositories/appointment.repository");
const userRepository = require("../../repositories/user/user.repository");

async function getAppointmentsByDateRange(req, res) {
  try {
    const { fechaDesde, fechaHasta, estado, profesionalId } = req.query;
    const userId = req.user.uid;

    const userData = await userRepository.getUserDataId(userId);
    if (userData.role !== "admin") {
      throw new Error("No autorizado. Se requiere rol de administrador.");
    }

    const allAppointments = await repository.getAppointments(
      {},
      { role: "admin" }
    );

    let filtered = allAppointments.filter((apt) => {
      const aptDate = apt.fecha;
      return aptDate >= fechaDesde && aptDate <= fechaHasta;
    });

    if (estado) {
      filtered = filtered.filter((apt) => apt.estado === estado);
    }

    if (profesionalId) {
      filtered = filtered.filter((apt) => apt.profesionalId === profesionalId);
    }

    const result = {
      appointments: filtered,
      count: filtered.length,
      fechaDesde,
      fechaHasta,
      message:
        filtered.length === 0
          ? `No se encontraron turnos en el rango de fechas ${fechaDesde} a ${fechaHasta}`
          : `Se encontraron ${filtered.length} turnos en el rango de fechas`,
    };

    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = { getAppointmentsByDateRange };
