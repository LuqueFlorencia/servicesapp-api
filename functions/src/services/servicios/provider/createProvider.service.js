const { createProviderDatabase } = require('../../repositories/provider.repository');

async function createProviderData(categoryId, serviceId, payload) {
  const { proUid, active = true } = payload;
  const created = await createProviderDatabase(categoryId, serviceId, proUid, active);
  return created;
}

module.exports = { createProviderData };
