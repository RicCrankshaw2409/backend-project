const commentRouter = require("express").Router();
const {
  deleteCommentByCommentId,
} = require("../controllers/comments_controller");

commentRouter.route("/:comment_id").delete(deleteCommentByCommentId);

module.exports = commentRouter;
