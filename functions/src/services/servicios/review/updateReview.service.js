const { updateReview } = require("../../../repositories/review.repository");

async function updateReviewId(categoryId, serviceId, reviewId, payload) {
  const updated = await updateReview(categoryId, serviceId, reviewId, payload);
  return updated;
}

module.exports = { updateReviewId };
