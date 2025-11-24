const auth = require('./auth.middleware');
const error = require('./error.middleware');
const validate = require('./validate.middleware');

module.exports = {
    ...auth,
    ...error,
    ...validate,
};