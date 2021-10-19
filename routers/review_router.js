const reviewRouter = require("express").Router();
const {
  getReviewById,
  patchReviewById,
  getReviews,
  postReview,
} = require("../controllers/review_controller");
const {
  getReviewCommentsByReviewId,
  postCommentByReviewId,
} = require("../controllers/comments_controller");

reviewRouter.route("/").get(getReviews).post(postReview);

reviewRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);

reviewRouter
  .route("/:review_id/comments")
  .get(getReviewCommentsByReviewId)
  .post(postCommentByReviewId);

module.exports = reviewRouter;
