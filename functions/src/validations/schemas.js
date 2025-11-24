const primitives = require('./joi.primitives');
const users = require('./user/user.schema');
const professionals = require('./user/professional.schema');

module.exports = {
    ...primitives,
    ...users,
    ...professionals,
};