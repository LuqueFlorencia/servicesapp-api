const {
  getGalleryByService,
} = require("../../../repositories/gallery.repository");

async function listGallery(categoryId, serviceId) {
  const galleries = await getGalleryByService(categoryId, serviceId);
  return galleries;
}

module.exports = { listGallery };
