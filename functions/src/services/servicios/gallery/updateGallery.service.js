const { updateGalleryDatabase } = require('../../../repositories/gallery.repository');

async function updateGalleryData(categoryId, serviceId, galleryId, payload) {
  const updated = await updateGalleryDatabase(categoryId, serviceId, galleryId, payload);
  return updated;
}

module.exports = { updateGalleryData };
