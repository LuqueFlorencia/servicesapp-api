const getReviewId = require('./getReview.service');
const deleteReview = require('./deleteReview.service');
const createReviewData = require('./createReview.service');

module.exports = { 
    ...getReviewId,
    ...deleteReview,
    ...createReviewData,
};