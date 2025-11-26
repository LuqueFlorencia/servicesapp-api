const { createGalleryDatabase } = require('../../repositories/gallery.repository');

async function createGalleryData(categoryId, serviceId, payload) {
  const created = await createGalleryDatabase(categoryId, serviceId, payload);
  return created;
}

module.exports = { createGalleryData };
