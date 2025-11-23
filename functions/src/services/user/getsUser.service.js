const repo = require('../../repositories/repositories');

// Obtener un usuario por dni
async function getUserByDni(dni) {
    const uid = await repo.getUidByDni(dni);
    const user = await repo.getUserDataId(uid);

    return user;
};

// Listar usuarios con filtros -role, city, province, active- (SOLO ADMIN)
async function listUsers(filters) {
    const users = await repo.listUsersRepo(filters);
    return users;
};

// Obtener los datos de ranking de un profesional por su dni
async function getProfessionalRating(dni) {
    const proUid = await repo.getUidByDni(dni);
    const rating = await repo.getRatingByUid(proUid);
    return rating;
};

// Listar profesionales con filtros -city, province, minRate, minRateCount, categoryId, serviceId-
async function listProfessionals(filters) {
    const pros = await repo.listProfessionalsRepo(filters);
    return pros;
};

module.exports = { getUserByDni, listUsers, getProfessionalRating, listProfessionals, };