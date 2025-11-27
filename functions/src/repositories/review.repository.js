const { db } = require('../utils/firebase');
const { ResourceNotFoundError } = require('../utils/httpsStatusCode');

//RUTA BASE 
const basePath = (categoryId, serviceId) =>
  `services/${categoryId}/${serviceId}/reviews`;



async function getReviewDataId(categoryId, serviceId, reviewId) {
  const ref = db.ref(`${basePath(categoryId, serviceId)}/${reviewId}`);
  const snapshot = await ref.once('value');
  const data = snapshot.val();

  if (!data) {
    throw new ResourceNotFoundError('No se encontró la reseña.');
  }

  return { ...data, id: reviewId };
}

async function getReviewsByService(categoryId, serviceId) {
  const ref = db.ref(basePath(categoryId, serviceId));
  const snapshot = await ref.once('value');
  const data = snapshot.val();

  if (!data) {
    return [];
  }

  const reviews = Object.entries(data).map(([id, review]) => ({
    ...review,
    id,
  }));

  return reviews;
}


async function deleteReview(categoryId, serviceId, reviewId) {
  const ref = db.ref(`${basePath(categoryId, serviceId)}/${reviewId}`);
  const snapshot = await ref.once('value');

  if (!snapshot.exists()) {
    throw new ResourceNotFoundError('No se encontró la reseña a eliminar.');
  }

  const data = snapshot.val();
  await ref.remove();

  return { ...data, id: reviewId };
}



async function createReviewDatabase(categoryId, serviceId, payload) {
  const ref = db.ref(basePath(categoryId, serviceId)).push();
  const reviewId = ref.key;

  const reviewToSave = {
    ...payload,
    createdAt: Date.now(),
  };

  await ref.set(reviewToSave);

  return { ...reviewToSave, id: reviewId };
}

module.exports = {
  getReviewDataId,
  getReviewsByService,
  deleteReview,
  createReviewDatabase,
};
