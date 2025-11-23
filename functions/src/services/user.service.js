const gets = require('../services/user/getsUser.service');
const updates = require('../services/user/updatesUser.service');
const creates = require('../services/user/createsUser.service');
const deletes = require('../services/user/deletesUser.service');

module.exports = { 
    ...gets,
    ...updates,
    ...creates,
    ...deletes,
};