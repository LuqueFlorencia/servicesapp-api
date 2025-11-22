const { updateProfile: repoUpdate } = require('../../repositories/user.repository');

async function updateMyProfile(uid, payload) {
    const updated = await repoUpdate(uid, payload);
    return updated;
}

module.exports = { updateMyProfile };