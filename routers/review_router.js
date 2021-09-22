const reviewRouter = require("express").Router();
const { getReviewById } = require("../controllers/review_controller");

reviewRouter.route("/:review_id").get(getReviewById);

module.exports = reviewRouter;
