const users = require('./user/user.schema');
const professionals = require('./user/professional.schema');

module.exports = {
    ...users,
    ...professionals,
};