const { createUserDatabase } = require('../../repositories/user.repository');

async function createUserData(payload) {
    const { uid, ...user } = payload;
    const created = await createUserDatabase(uid, user);
    return created;
};

module.exports = { createUserData };