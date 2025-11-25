const { createServiceDatabase } = require('../../repositories/service.repository');

async function createServiceData(payload) {
    const { uid, ...service } = payload;
    const created = await createServiceDatabase(uid, service);
    return created;
};

module.exports = { createServiceData };   