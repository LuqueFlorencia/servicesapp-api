const { db } = require('../../utils/firebase');
const { ResourceNotFoundError } = require('../../utils/errores');

const USERS_ROOT = 'users';
const SERVICES_ROOT = 'services';

async function addRatingByUid(uid, score) {
    const ref = db.ref(`${USERS_ROOT}/${uid}/personal`);
    const snapshot = await ref.once('value');
    const personal = snapshot.val() || {};

    const currentAvg = Number(personal.ratingAvg) || 0;
    const currentCount = Number(personal.ratingCount) || 0;

    const newCount = currentCount + 1;
    const newAvg = ((currentAvg * currentCount) + score) / newCount;

    await ref.update({
        ratingAvg: newAvg,
        ratingCount: newCount,
    });

    const userSnap = await db.ref(`${USERS_ROOT}/${uid}`).once('value');
    const updatedUser = userSnap.val();

    return { ...updatedUser, id: uid };
};

async function getRatingByUid(uid) {
    const ref = db.ref(`${USERS_ROOT}/${uid}/personal`);
    const snapshot = await ref.once('value');
    const personal = snapshot.val();

    if (!personal) throw new ResourceNotFoundError(`No se encontró el perfil personal para uid = ${uid}.`);

    return {
        ratingAvg: personal.ratingAvg ?? 0,
        ratingCount: personal.ratingCount ?? 0,
    };
};

async function ensureServiceExists(categoryId, serviceId) {
    const ref = db.ref(`${SERVICES_ROOT}/${categoryId}/${serviceId}`);
    const snap = await ref.once('value');
    if (!snap.exists())
        throw new ResourceNotFoundError(`No existe el servicio ${serviceId} en la categoría ${categoryId}.`);
};

async function addServiceForPro(uid, categoryId, serviceId) {
    // Realizamos un update multi-path para mantener consistencia
    const updates = {};
    updates[`${USERS_ROOT}/${uid}/services/${categoryId}/${serviceId}`] = true;
    updates[`${SERVICES_ROOT}/${categoryId}/${serviceId}/providers/${uid}`] = true;

    await db.ref().update(updates);

    const userSnap = await db.ref(`${USERS_ROOT}/${uid}`).once('value');
    const user = userSnap.val() || {};
    return { ...user, id: uid };
};

async function removeServiceForPro(uid, categoryId, serviceId) {
    const updates = {};
    updates[`${USERS_ROOT}/${uid}/services/${categoryId}/${serviceId}`] = null;
    updates[`${SERVICES_ROOT}/${categoryId}/${serviceId}/providers/${uid}`] = null;

    await db.ref().update(updates);

    const userSnap = await db.ref(`${USERS_ROOT}/${uid}`).once('value');
    const user = userSnap.val() || {};
    return { ...user, id: uid };
};

async function listProfessionalsRepo(filters) {
    const ref = db.ref(USERS_ROOT);
    const snapshot = await ref.once('value');
    const data = snapshot.val() || {};

    let list = Object.entries(data)
        .filter(([uid, user]) =>
            user &&
            user.role === 'pro' &&
            user.is_deleted === false
        )
        .map(([uid, user]) => ({ ...user, id: uid }));

    // Filtros opcionales
    if (filters.city)       list = list.filter(u => u.personal?.city === filters.city);
    if (filters.province)   list = list.filter(u => u.personal?.province === filters.province);

    if (filters.minRating !== undefined) {
        const minRating = Number(filters.minRating);
        list = list.filter(u => {
            const avg = Number(u.personal?.ratingAvg ?? 0);
            return avg >= minRating;
        });
    };

    if (filters.minRatingCount !== undefined) {
        const minCount = Number(filters.minRatingCount);
        list = list.filter(u => {
            const count = Number(u.personal?.ratingCount ?? 0);
            return count >= minCount;
        });
    };

    // Filtro por servicios
    if (filters.categoryId) {
        const catId = filters.categoryId;
        list = list.filter(u => {
            const services = u.services || {};
            return !!services[catId];
        });

        if (filters.serviceId) {
            const svcId = filters.serviceId;
            list = list.filter(u => {
                const services = u.services || {};
                const cat = services[catId] || {};
                return cat[svcId] === true;
            });
        }
    };

    return list;
};

module.exports = { 
    addRatingByUid,
    getRatingByUid,
    ensureServiceExists,
    addServiceForPro,
    removeServiceForPro,
    listProfessionalsRepo,
};