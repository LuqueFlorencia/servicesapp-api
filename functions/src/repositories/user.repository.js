const { db } = require('../utils/firebase');
const { httpStatusCodes, ResourceNotFoundError } = require('../utils/httpsStatusCode');

async function getUserDataId(userId){
    const userRef = db.ref(`users/${userId}`)
    const userSnapshot = await userRef.once('value');
    const userData = userSnapshot.val();
    userData.id = userRef.key;

    if (!userData)
        throw new ResourceNotFoundError('User not found');

    return userData;
};

async function createUserDatabase(data) {
    const userRef = await db.ref(`user/`).push(data);
    const userSnapshot = await userRef.once('value');
    let value = userSnapshot.val();
    value.id = userRef.key;
    return value;
};

module.exports = { 
    getUserDataId, 
    createUserDatabase, 
};
