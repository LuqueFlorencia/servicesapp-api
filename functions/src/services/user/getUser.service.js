const  { getUserDataId } = require('../../repositories/user.repository');

async function getUserId(userId){
    const user = await getUserDataId(userId);
    return user;
}

module.exports = { getUserId };