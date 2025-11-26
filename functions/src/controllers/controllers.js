const users = require('./user/user.controller');
const professionals = require('./user/professional.controller');
const py_categories = require('./py-category/category.controller');

module.exports = {
    ...py_categories,
    ...users,
    ...professionals,
};