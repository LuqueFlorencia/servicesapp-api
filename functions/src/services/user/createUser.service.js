const  { getUserDataID, createUserDatabase } = require('../../repositories/user.repository');

async function createUserData(data){
    try {
        const user = await getUserDataID(userUid);
        return user;
    } catch (error) {
        
    }
}

module.exports = { createUserData };