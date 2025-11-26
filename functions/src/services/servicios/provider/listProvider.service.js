const { getProvidersByService } = require('../../repositories/provider.repository');

async function listProviders(categoryId, serviceId) {
  const providers = await getProvidersByService(categoryId, serviceId);
  return providers;
}

module.exports = { listProviders };
