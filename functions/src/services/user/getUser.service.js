const  { getUserDataID } = require('../../repositories/user.repository');

async function getUserId(userId){
    try {
        const user = await getUserDataID(userId);
        return user;
    } catch (error) {
        
    }
}

module.exports = { getUserId };