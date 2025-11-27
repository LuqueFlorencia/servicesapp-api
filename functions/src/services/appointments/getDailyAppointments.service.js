const repository = require("../../repositories/appointment.repository");
const userRepository = require("../../repositories/user/user.repository");

async function getDailyAppointments(req, res) {
  try {
    const { fecha, tipo } = req.query;
    const userId = req.user.uid;

    // Obtener el rol del usuario
    const userData = await userRepository.getUserDataId(userId);
    const userRole = userData.role;

    let filters = {};

    // Si es admin, ve todos los turnos del día
    if (userRole === "admin") {
      // Admin ve todos los turnos sin filtros adicionales
    }
    // Si es profesional, ve solo sus turnos
    else if (userRole === "pro") {
      filters.profesionalId = userId;
    }
    // Si es usuario normal, ve solo sus turnos
    else {
      filters.usuarioId = userId;
    }

    // Obtener turnos del día
    const allAppointments = await repository.getAppointments(filters, {
      role: userRole,
    });

    // Filtrar por fecha específica
    const dailyAppointments = allAppointments.filter(
      (apt) => apt.fecha === fecha
    );

    // Si se especifica tipo, aplicar filtro adicional
    let filteredByType = dailyAppointments;
    if (tipo === "usuario" && userRole === "pro") {
      // Profesional viendo solo turnos de usuarios (sin filtro adicional)
    } else if (tipo === "profesional" && userRole !== "pro") {
      // Usuario viendo solo turnos de profesionales (sin filtro adicional)
    }

    // Organizar por hora para mejor visualización
    const sortedAppointments = filteredByType.sort((a, b) => {
      return a.hora.localeCompare(b.hora);
    });

    // Estadísticas del día
    const stats = {
      total: filteredByType.length,
      pendientes: filteredByType.filter((a) => a.estado === "pendiente").length,
      confirmados: filteredByType.filter((a) => a.estado === "confirmado")
        .length,
      en_proceso: filteredByType.filter((a) => a.estado === "en_proceso")
        .length,
      completados: filteredByType.filter((a) => a.estado === "completado")
        .length,
    };

    const result = {
      fecha,
      appointments: sortedAppointments,
      count: filteredByType.length,
      stats,
      message:
        filteredByType.length === 0
          ? `No se encontraron turnos para la fecha ${fecha}`
          : `Se encontraron ${filteredByType.length} turnos para ${fecha}`,
    };

    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = { getDailyAppointments };
