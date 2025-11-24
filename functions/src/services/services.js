const getsUser = require('./user/getsUser.service');
const updatesUser = require('./user/updatesUser.service');
const professionals = require('./user/professional.service');
const premium = require('./user/premium.service');

module.exports = { 
    ...getsUser,
    ...updatesUser,
    ...professionals,
    ...premium,
};