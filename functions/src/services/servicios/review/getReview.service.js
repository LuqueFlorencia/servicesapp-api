const { getReviewDataId } = require("../../../repositories/review.repository");

async function getReviewId(categoryId, serviceId, reviewId) {
  const review = await getReviewDataId(categoryId, serviceId, reviewId);
  return review;
}

module.exports = { getReviewId };
