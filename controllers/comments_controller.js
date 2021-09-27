const {
  fetchReviewCommentsByReviewId,
  addCommentsByReviewId,
} = require("../models/comments_model");

exports.getReviewCommentsByReviewId = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const result = await fetchReviewCommentsByReviewId(review_id);
    console.log(result);
    res.status(200).send({ comments: result });
  } catch (err) {
    next(err);
  }
};

exports.postCommentByReviewId = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const { username, body } = req.body;
    const result = await addCommentsByReviewId(review_id, username, body);
    res.status(200).send({ comment: result });
  } catch (err) {
    next(err);
  }
};
