const getProvider = require('./getProvider.service');
const listProviders = require('./listProviders.service');
const createProviderData = require('./createProvider.service');
const updateProviderData = require('./updateProvider.service');

module.exports = {
  ...getProvider,
  ...listProviders,
  ...createProviderData,
  ...updateProviderData,
};
