const repo = require('../../repositories/user.repository');
const { ResourceNotFoundError } = require('../../utils/errores');

async function updatePersonalProfile(uid, personalPayload) {   
    let existingUser = null;
    let role = 'client'; 

    try {
        existingUser = await repo.getUserDataId(uid);
        role = existingUser.role || 'client';
    } catch (err) {
        if (!(err instanceof ResourceNotFoundError)) throw err;
    }

    if (user.role === 'pro') {
        if (personalPayload.personal.ratingAvg === undefined) personalPayload.personal.ratingAvg = 0;
        if (personalPayload.personal.ratingCount === undefined) personalPayload.personal.ratingCount = 0;
    };

    const payload = { personal: personalPayload };

    const updatedUser = await repo.updateProfileByUid(uid, payload);
    return updatedUser;
};

async function updateExistingUserByDni(dni, payload) {
    const uid = await repo.getUidByDni(dni);
    await repo.getUserDataId(uid);

    payload.personal = payload.personal || {};
    payload.personal.dni = dni;

    const updated = await repo.updateProfileByUid(uid, payload);
    return updated;
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
    updatePersonalProfile,
    updateExistingUserByDni,
    updatePersonalByDni, 
    updateRoleByDni,
    updateStatusByDni,
};