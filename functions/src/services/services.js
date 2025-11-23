const getsUser = require('./user/getsUser.service');
const updatesUser = require('./user/updatesUser.service');
const postsUser = require('./user/postsUser.service');
const deletesUser = require('./user/deletesUser.service');

module.exports = { 
    ...getsUser,
    ...updatesUser,
    ...postsUser,
    ...deletesUser,
};