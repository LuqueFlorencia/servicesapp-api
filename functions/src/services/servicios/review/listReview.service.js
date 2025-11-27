const { getReviewsByService } = require('../../../repositories/review.repository');

async function listReview(categoryId, serviceId) {
  const reviews = await getReviewsByService(categoryId, serviceId);
  return reviews;
}

module.exports = { listReview };