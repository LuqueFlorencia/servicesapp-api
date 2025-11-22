const  { getUserDataId, getUidByDni } = require('../../repositories/user.repository');

async function getUserByDni(dni) {
    const uid = await getUidByDni(dni);
    const user = await getUserDataId(uid);

    return user;
};

module.exports = { getUserByDni };