const updates = require('../services/user/updatesUser.service');
const gets = require('../services/user/getsUser.service');

module.exports = { 
    ...updates,
    ...gets,
};