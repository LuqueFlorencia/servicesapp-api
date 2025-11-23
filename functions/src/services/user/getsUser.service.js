const  repo = require('../../repositories/user.repository');

async function getUserByDni(dni) {
    const uid = await repo.getUidByDni(dni);
    const user = await repo.getUserDataId(uid);

    return user;
};

async function listUsers(filters) {
    const users = await repo.listUsersRepo(filters);
    return users;
};

module.exports = { getUserByDni, listUsers };