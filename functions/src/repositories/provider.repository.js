const { db } = require('../utils/firebase');
const { ResourceNotFoundError } = require('../utils/httpsStatusCode');

// RUTA BASE: services/{categoryId}/{serviceId}/providers
const basePath = (categoryId, serviceId) =>
  `services/${categoryId}/${serviceId}/providers`;

async function getProviderDataId(categoryId, serviceId, providerId) {
  const ref = db.ref(`${basePath(categoryId, serviceId)}/${providerId}`);
  const snapshot = await ref.once('value');
  const active = snapshot.val();

  if (active === null) {
    throw new ResourceNotFoundError('No se encontró el proveedor.');
  }

  return { id: providerId, active: Boolean(active) };
}

async function getProvidersByService(categoryId, serviceId) {
  const ref = db.ref(basePath(categoryId, serviceId));
  const snapshot = await ref.once('value');
  const data = snapshot.val();

  if (!data) {
    return [];
  }

  const providers = Object.entries(data).map(([id, active]) => ({
    id,
    active: Boolean(active),
  }));

  return providers;
}

async function createProviderDatabase(categoryId, serviceId, providerId, active = true) {
  const ref = db.ref(`${basePath(categoryId, serviceId)}/${providerId}`);
  await ref.set(active);

  return { id: providerId, active: Boolean(active) };
}

module.exports = {
  getProviderDataId,
  getProvidersByService,
  createProviderDatabase,
};
