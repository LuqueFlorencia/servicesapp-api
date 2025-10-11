const getUserId = require('./user/getUser.service');
const createUserData = require('./user/createUser.service');

module.exports = { 
    ...getUserId,
    ...createUserData,
};