const { db } = require('../utils/firebase');
const { ResourceNotFoundError } = require("../utils/errores");

// RUTA BASE
const basePath = (categoryId, serviceId) =>
  `services/${categoryId}/${serviceId}/gallery`;

async function getGalleryDataId(categoryId, serviceId, galleryId) {
  const ref = db.ref(`${basePath(categoryId, serviceId)}/${galleryId}`);
  const snapshot = await ref.once('value');
  const data = snapshot.val();

  if (!data) {
    throw new ResourceNotFoundError('No se encontró la imagen de galería.');
  }

  return { ...data, id: galleryId };
}

async function getGalleryByService(categoryId, serviceId) {
  const ref = db.ref(basePath(categoryId, serviceId));
  const snapshot = await ref.once('value');
  const data = snapshot.val();

  if (!data) {
    return [];
  }

  const galleries = Object.entries(data).map(([id, gallery]) => ({
    ...gallery,
    id,
  }));

  return galleries;
}

async function deleteGallery(categoryId, serviceId, galleryId) {
  const ref = db.ref(`${basePath(categoryId, serviceId)}/${galleryId}`);
  const snapshot = await ref.once('value');

  if (!snapshot.exists()) {
    throw new ResourceNotFoundError('No se encontró la imagen de galería a eliminar.');
  }

  const data = snapshot.val();
  await ref.remove();

  return { ...data, id: galleryId };
}

async function createGalleryDatabase(categoryId, serviceId, payload) {
  const ref = db.ref(basePath(categoryId, serviceId)).push();
  const galleryId = ref.key;

  const galleryToSave = {
    ...payload,
    createdAt: Date.now(),
  };

  await ref.set(galleryToSave);

  return { ...galleryToSave, id: galleryId };
}

async function updateGalleryDatabase(categoryId, serviceId, galleryId, payload) {
  const ref = db.ref(`${basePath(categoryId, serviceId)}/${galleryId}`);
  const snapshot = await ref.once('value');
  const data = snapshot.val();

  if (!data) {
    throw new ResourceNotFoundError('No se encontró la imagen de galería a actualizar.');
  }

  const merged = { ...data, ...payload };

  await ref.set(merged);

  return { ...merged, id: galleryId };
}

module.exports = {
  getGalleryDataId,
  getGalleryByService,
  deleteGallery,
  createGalleryDatabase,
  updateGalleryDatabase,
};