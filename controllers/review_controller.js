const {
  fetchReviewById,
  updateReviewById,
  fetchReviews,
} = require("../models/review_model");

exports.getReviews = async (req, res, next) => {
  const { sort_by, order, category } = req.query;
  try {
    const result = await fetchReviews(sort_by, order, category);
    res.status(200).send({ reviews: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const result = await fetchReviewById(review_id);
    res.status(200).send({ review: result });
  } catch (err) {
    next(err);
  }
};

exports.patchReviewById = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const { inc_votes } = req.body;
    const result = await updateReviewById(review_id, inc_votes);
    res.status(200).send({ updatedReview: result });
  } catch (err) {
    next(err);
  }
};
