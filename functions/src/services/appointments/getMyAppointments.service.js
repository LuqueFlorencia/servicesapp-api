const repository = require("../../repositories/appointment.repository");

async function getMyAppointments(req, res) {
  try {
    const userId = req.user.uid;
    const { estado } = req.query;

    const filters = {
      usuarioId: userId,
      estado: estado, // Filtro opcional por estado
    };

    const appointments = await repository.getAppointments(filters, req.user);
    return appointments;
  } catch (err) {
    throw err;
  }
}

module.exports = { getMyAppointments };
