const { getSuccessResponseObject } = require("../utils/utils");
const { httpStatusCodes } = require("../utils/errores");
const galleryService = require("../services/servicios/gallery/gallery.service");

// POST 
async function createGallery(req, res) {
  const { categoryId, serviceId } = req.params;
  const payload = req.body;

  const data = await galleryService.createGalleryData(
    categoryId,
    serviceId,
    payload
  );

  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(data, httpStatusCodes.ok, "OK", "Reseña creada.")
    );
}

// GET
async function listGallerys(req, res) {
  const { categoryId, serviceId } = req.params;

  const data = await galleryService.listGallery(categoryId, serviceId);

  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Reseñas obtenidas."
      )
    );
}

// GET 
async function getGallery(req, res) {
  const { categoryId, serviceId, galleryId } = req.params;

  const data = await galleryService.getGalleryId(categoryId, serviceId, galleryId);

  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Reseña obtenida."
      )
    );
}

// DELETE
async function deleteGallery(req, res) {
  const { categoryId, serviceId, galleryId } = req.params;

  const data = await galleryService.deleteGalleryId(
    categoryId,
    serviceId,
    galleryId
  );

  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Reseña eliminada."
      )
    );
}

module.exports = {
  createGallery,
  listGallerys,
  getGallery,
  deleteGallery,
};
