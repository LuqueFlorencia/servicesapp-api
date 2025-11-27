const { createProviderDatabase } = require('../../repositories/provider.repository');

async function updateProviderData(categoryId, serviceId, proUid, payload) {
  const { active } = payload;
  const updated = await createProviderDatabase(categoryId, serviceId, proUid, active);
  return updated;
}

module.exports = { updateProviderData };

