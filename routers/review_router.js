const reviewRouter = require("express").Router();
const {
  getReviewById,
  patchReviewById,
  getReviews,
} = require("../controllers/review_controller");

reviewRouter.route("/").get(getReviews);

reviewRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);

reviewRouter.route("/:review_id/comments").get(postReviewCommentsByReviewId);

module.exports = reviewRouter;
