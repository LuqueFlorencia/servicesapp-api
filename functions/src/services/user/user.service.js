const getUserId = require('./getUser.service');
const updateMyProfile = require('./updateUser.service');
const createUserData = require('./createUser.service');

module.exports = { 
    ...getUserId,
    ...updateMyProfile,
    ...createUserData,
};