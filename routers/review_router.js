const reviewRouter = require("express").Router();
const {
  getReviewById,
  patchReviewById,
  getReviews,
} = require("../controllers/review_controller");

reviewRouter.route("/").get(getReviews);

reviewRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);

module.exports = reviewRouter;
