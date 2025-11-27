const getReviewId = require('./getReview.service');
const getReviewByService = require("./listReview.service");
const deleteReview = require('./deleteReview.service');
const createReviewData = require('./createReview.service');
const update = require('./updateReview.service');

module.exports = { 
    ...getReviewByService,
    ...getReviewId,
    ...deleteReview,
    ...createReviewData,
    ...update,
};