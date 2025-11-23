const users = require('./users/user.controller');
const professionals = require('./users/professional.controller');

module.exports = {
    ...users,
    ...professionals,
};