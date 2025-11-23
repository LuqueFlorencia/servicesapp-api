const repo = require('../../repositories/user.repository');
const { ResourceNotFoundError } = require('../../utils/errores');

async function updateProfileByDni(dni, payload) {
    let uid;
    try{ 
        uid = await repo.getUidByDni(dni);
    } catch (err) {
        if (err instanceof ResourceNotFoundError)
            uid = dni;
        else
            throw err;
    };

    payload.personal = payload.personal || {};
    payload.personal.dni = dni;
    
    const user = await repo.updateProfileByUid(uid, payload);
    return user;
};

async function updatePersonalByDni(dni, personalData) {
    const uid = await repo.getUidByDni(dni);
    const user = await repo.updatePersonalByUid(uid, personalData);
    return user;
};

async function updateRoleByDni(dni, role) {
    const uid = await repo.getUidByDni(dni);
    const user = await repo.updateRoleByUid(uid, role);
    return user;
};

async function updateStatusByDni(dni, is_deleted) {
    const uid = await repo.getUidByDni(dni);
    const user = await repo.updateStatusByUid(uid, is_deleted);
    return user;
};

module.exports = { 
    updateProfileByDni, 
    updatePersonalByDni, 
    updateRoleByDni,
    updateStatusByDni,
};