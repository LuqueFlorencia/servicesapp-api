const { deleteReview } = require("../../../repositories/review.repository");

async function deleteReviewId(categoryId, serviceId, reviewId) {
  const deleted = await deleteReview(categoryId, serviceId, reviewId);
  return deleted;
}

module.exports = {
  deleteReviewId,
};
