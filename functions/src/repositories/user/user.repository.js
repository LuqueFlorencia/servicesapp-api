const { db } = require('../../utils/firebase');
const { ResourceNotFoundError } = require('../../utils/errores');

const USERS_ROOT = 'users';
const DNI_INDEX_ROOT = 'dniToUid';

async function updateProfileByUid(uid, payload) {
    const ref = db.ref(`${USERS_ROOT}/${uid}`);

    // Upsert: si no existe, lo crea; si existe, hace merge
    await ref.update(payload);

    const snapshot = await ref.once('value');
    const user = snapshot.val() || {};
    
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

async function updatePersonalByUid(uid, personalData) {
    const ref = db.ref(`${USERS_ROOT}/${uid}`);
    const snapshot = await ref.once('value');

    const user = snapshot.val();
    if (!user) throw new ResourceNotFoundError(`No se encontró el usuario con uid = ${uid}.`);

    const personalRef = ref.child('personal');
    await personalRef.update(personalData);

    const updatedSnap = await ref.once('value');
    const updatedUser = updatedSnap.val();

    return { ...updatedUser, id: uid };
};

async function updateRoleByUid(uid, role) {
    const ref = db.ref(`${USERS_ROOT}/${uid}`);
    const snapshot = await ref.once('value');

    const user = snapshot.val();
    if (!user) throw new ResourceNotFoundError(`No se encontró el usuario con uid = ${uid}.`);

    await ref.child('role').set(role);

    const updatedSnap = await ref.once('value');
    const updatedUser = updatedSnap.val();

    return { ...updatedUser, id: uid };
};

async function listUsersRepo({ role, city, province, active }) {
    const snapshot = await db.ref(USERS_ROOT).once('value');
    const usersObj = snapshot.val() || {};

    const result = Object.entries(usersObj)
        .map(([uid, user]) => ({ ...user, id: uid }))
        .filter(u => {
            if (role && u.role !== role) return false;
            if (typeof active === 'boolean' && u.is_deleted !== active) return false;
            if (city && (!u.personal || u.personal.city !== city)) return false;
            if (province && (!u.personal || u.personal.province !== province)) return false;
            return true;
        });

    return result;
};

async function updateStatusByUid(uid, is_deleted) {
    const userRef = db.ref(`${USERS_ROOT}/${uid}`);
    const snapshot = await userRef.once('value');

    const user = snapshot.val();
    if (!user) throw new ResourceNotFoundError(`No se encontró el usuario con uid = ${uid}.`);

    await userRef.child('is_deleted').set(is_deleted);

    const updatedSnap = await userRef.once('value');
    const updatedUser = updatedSnap.val();

    return { ...updatedUser, id: uid };
};

module.exports = { 
    updateProfileByUid,
    linkDniToUid,
    getUserDataId,
    getUidByDni,
    updatePersonalByUid,
    updateRoleByUid,
    listUsersRepo,
    updateStatusByUid,
};
