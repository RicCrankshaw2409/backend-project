const { fetchReviewById } = require("../models/review_model");

exports.getReviewById = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const result = await fetchReviewById(review_id);
    res.status(200).send({ review: result });
  } catch (err) {
    next(err);
  }
};
