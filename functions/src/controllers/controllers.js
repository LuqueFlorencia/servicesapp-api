const users = require('./user/user.controller');
const professionals = require('./user/professional.controller');

module.exports = {
    ...users,
    ...professionals,
};