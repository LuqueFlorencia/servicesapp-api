const { updateMyProfile: repoUpdateMyProfile } = require('../../repositories/user.repository');

async function updateMyProfile(uid, payload) {
    const updated = await repoUpdateMyProfile(uid, payload);
    return updated;
}

module.exports = { updateMyProfile };