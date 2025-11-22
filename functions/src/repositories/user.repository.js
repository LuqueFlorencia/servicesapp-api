const { db } = require('../utils/firebase');
const { ResourceNotFoundError } = require('../utils/httpsStatusCode');

const USERS_ROOT = 'users';
const DNI_INDEX_ROOT = 'dniToUid';

async function updateProfile(uid, payload) {
    const ref = db.ref(`${USERS_ROOT}/${uid}`);
    await ref.update(payload);
    const snapshot = await ref.once('value');

    const user = snapshot.val();
    if (!user) throw new ResourceNotFoundError(`No se encontró el usuario con uid = ${uid}.`);

    const dni = payload.personal?.dni || user.personal?.dni;
    if (dni) await linkDniToUid(dni, uid);

    return { ...user, id: uid };
};

async function linkDniToUid(dni, uid) {
    const ref = db.ref(`${DNI_INDEX_ROOT}/${dni}`);
    await ref.set(uid);
};

async function getUserDataId(uid){
    const ref = db.ref(`${USERS_ROOT}/${uid}`)
    const snapshot = await ref.once('value');
    const data = snapshot.val();

    if (!data) throw new ResourceNotFoundError(`No se encontro el usuario con uid = ${uid}.`);

    return { ...data, id: ref.key };
};

async function getUidByDni(dni) {
    const ref = db.ref(`${DNI_INDEX_ROOT}/${dni}`);
    const snapshot = await ref.once('value');
    const uid = snapshot.val();

    if (!uid) throw new ResourceNotFoundError(`No se encontró un usuario con dni = ${dni}.`);

    return uid;
};

async function createUserDatabase(uid, payload) {
    const ref = db.ref(`${USERS_ROOT}/${uid}`);
    await ref.set(payload);
    const snapshot = await ref.once('value');
    return { ...snapshot.val(), id: uid };
};

module.exports = { 
    updateProfile,
    linkDniToUid,
    getUserDataId,
    getUidByDni,
    createUserDatabase, 
};
