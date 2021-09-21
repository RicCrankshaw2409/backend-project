const apiRouter = require("express").Router();
const categoryRouter = require("./category_router");
const reviewRouter = require("./review_router");
const commentRouter = require("./comment_router");
const userRouter = require("./user_router");

apiRouter.use("/category", categoryRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;