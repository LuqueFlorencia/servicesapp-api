const  repo = require('../../repositories/user.repository');

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

module.exports = { getUserByDni, listUsers };