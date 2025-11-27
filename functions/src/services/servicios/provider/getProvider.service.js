const { getProviderDataId } = require('../../repositories/provider.repository');

async function getProviderId(categoryId, serviceId, proUid) {
  const provider = await getProviderDataId(categoryId, serviceId, proUid);
  return provider;
}

module.exports = { getProviderId };
