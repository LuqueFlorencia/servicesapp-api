const { db } = require('../utils/firebase');
const { ResourceNotFoundError } = require('../utils/httpsStatusCode');

const basePath = (categoryId) => `services/${categoryId}`;


async function getServiceDataId(categoryId, serviceId) {
  const ref = db.ref(`${basePath(categoryId)}/${serviceId}`);
  const snapshot = await ref.once('value');
  const data = snapshot.val();

  if (!data) {
    throw new ResourceNotFoundError('No se encontró el servicio.');
  }

  return { ...data, id: serviceId };
}

async function getServicesByCategory(categoryId) {
  const ref = db.ref(basePath(categoryId));
  const snapshot = await ref.once('value');
  const data = snapshot.val();

  if (!data) {
    return [];
  }

  const services = Object.entries(data).map(([id, svc]) => ({
    ...svc,
    id,
  }));

  return services;
}


async function deleteService(categoryId, serviceId) {
  const ref = db.ref(`${basePath(categoryId)}/${serviceId}`);
  const snapshot = await ref.once('value');

  if (!snapshot.exists()) {
    throw new ResourceNotFoundError('No se encontró el servicio a eliminar.');
  }

  const data = snapshot.val();
  await ref.remove();

  return { ...data, id: serviceId };
}


async function createServiceDatabase(categoryId, payload) {
  const ref = db.ref(basePath(categoryId)).push();
  const serviceId = ref.key;

  const serviceToSave = {
    ...payload,
    createdAt: Date.now(),
  };

  await ref.set(serviceToSave);

  return { ...serviceToSave, id: serviceId };
}

module.exports = {
  getServiceDataId,
  getServicesByCategory,
  deleteService,
  createServiceDatabase,
};
