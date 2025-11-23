const repo = require('../../repositories/repositories');
const { ResourceNotFoundError } = require('../../utils/errores');

// Completar perfil personal tras login (PROPIO USER LOGEADO)
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

// Actualizar usuario completo (SOLO ADMIN)
async function updateExistingUserByDni(dni, payload) {
    const uid = await repo.getUidByDni(dni);
    await repo.getUserDataId(uid);

    payload.personal = payload.personal || {};
    payload.personal.dni = dni;

    const updated = await repo.updateProfileByUid(uid, payload);
    return updated;
};

// Actualizar datos personales
async function updatePersonalByDni(dni, personalData) {
    const uid = await repo.getUidByDni(dni);
    const user = await repo.updatePersonalByUid(uid, personalData);
    return user;
};

// Cambiar rol del usuario (SOLO ADMIN)
async function updateRoleByDni(dni, role) {
    const uid = await repo.getUidByDni(dni);
    const user = await repo.updateRoleByUid(uid, role);
    return user;
};

// Actualizar estado de actividad de la cuenta -activo/inactivo- (SOLO ADMIN)
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