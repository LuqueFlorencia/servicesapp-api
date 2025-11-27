const { deleteGallery } = require("../../../repositories/gallery.repository");

async function deleteGalleryId(categoryId, serviceId, galleryId) {
  const deleted = await deleteGallery(categoryId, serviceId, galleryId);
  return deleted;
}

module.exports = {
  deleteGalleryId,
};
