const { db } = require('../utils/firebase');
const { ResourceNotFoundError } = require('../utils/httpsStatusCode');

async function getUserDataId(userId){
    const ref = db.ref(`users/${userId}`)
    const snapshot = await ref.once('value');
    const data = snapshot.val();

    if (!data) throw new ResourceNotFoundError('No se encontro el usuario.');

    return { ...data, id: ref.key };
};

async function updateMyProfile(uid, payload) {
    const ref = db.ref(`users/${uid}`);
    await ref.update(payload);
    const snapshot = await ref.once('value');
    return { ...snapshot.val(), id: uid };
}

async function createUserDatabase(uid, payload) {
    const ref = db.ref(`users/${uid}`);
    await ref.set(payload);
    const snapshot = await ref.once('value');
    return { ...snapshot.val(), id: uid };
};

module.exports = { 
    getUserDataId, 
    updateMyProfile,
    createUserDatabase, 
};
