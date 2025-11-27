const {
  getGalleryDataId,
} = require("../../../repositories/gallery.repository");

async function getGalleryId(categoryId, serviceId, galleryId) {
  const gallery = await getGalleryDataId(categoryId, serviceId, galleryId);
  return gallery;
}

module.exports = { getGalleryId };
