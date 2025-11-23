const users = require('./users/user.repository');
const professionals = require('./users/professional.repository');

module.exports = {
    ...users,
    ...professionals,
};