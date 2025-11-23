const users = require('./user/user.repository');
const professionals = require('./user/professional.repository');

module.exports = {
    ...users,
    ...professionals,
};