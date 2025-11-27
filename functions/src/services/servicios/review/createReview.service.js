const {
  createReviewDatabase,
} = require("../../../repositories/review.repository");

async function createReviewData(categoryId, serviceId, payload) {
  const created = await createReviewDatabase(categoryId, serviceId, payload);
  return created;
}

module.exports = { createReviewData };
