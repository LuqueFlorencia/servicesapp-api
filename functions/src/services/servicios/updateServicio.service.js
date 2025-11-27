const { db } = require('../utils/firebase');
const { ResourceNotFoundError } = require('../utils/httpsStatusCode');

const basePath = (categoryId) => `services/${categoryId}`;


async function updateServiceDatabase(categoryId, serviceId, payload) {
  const ref = db.ref(`${basePath(categoryId)}/${serviceId}`);
  const snapshot = await ref.once('value');

  if (!snapshot.exists()) {
    throw new ResourceNotFoundError('No se encontró el servicio a actualizar.');
  }

  await ref.update(payload);

  const updatedSnapshot = await ref.once('value');
  const updated = updatedSnapshot.val();

  return { ...updated, id: serviceId };
}


module.exports = {
  updateServiceDatabase
};