const { getSuccessResponseObject } = require("../utils/utils");
const { httpStatusCodes } = require("../utils/errores");
const reviewService = require("../services/servicios/review/review.service");

// POST 
async function createReview(req, res) {
  const { categoryId, serviceId } = req.params;
  const payload = req.body;

  const data = await reviewService.createReviewData(
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
async function listReviews(req, res) {
  const { categoryId, serviceId } = req.params;

  const data = await reviewService.listReview(categoryId, serviceId);

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
async function getReview(req, res) {
  const { categoryId, serviceId, reviewId } = req.params;

  const data = await reviewService.getReviewId(categoryId, serviceId, reviewId);

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
async function deleteReview(req, res) {
  const { categoryId, serviceId, reviewId } = req.params;

  const data = await reviewService.deleteReviewId(
    categoryId,
    serviceId,
    reviewId
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

// PATCH 
async function updateReview(req, res) {
  const { categoryId, serviceId, reviewId } = req.params;
  const payload = req.body;

  const data = await reviewService.updateReviewId(
    categoryId,
    serviceId,
    reviewId,
    payload
  );

  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Reseña actualizada."
      )
    );
}

module.exports = {
  createReview,
  listReviews,
  getReview,
  deleteReview,
  updateReview,
};
