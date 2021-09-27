const commentRouter = require("express").Router();
const {
  deleteCommentByCommentId,
  patchCommentById,
} = require("../controllers/comments_controller");

commentRouter
  .route("/:comment_id")
  .delete(deleteCommentByCommentId)
  .patch(patchCommentById);

module.exports = commentRouter;
