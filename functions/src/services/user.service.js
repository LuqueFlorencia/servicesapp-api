const updateMyProfile = require('./updateUser.service');
const getUserByDni = require('./getUser.service');
const createUserData = require('./createUser.service');

module.exports = { 
    ...updateMyProfile,
    ...getUserByDni,
    ...createUserData,
};