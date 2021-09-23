const apiRouter = require("express").Router();
const categoryRouter = require("./category_router");
const reviewRouter = require("./review_router");
const commentRouter = require("./comment_router");
const userRouter = require("./user.router");

apiRouter.use("/categories", categoryRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter);

apiRouter.use("/", (req, res) => {
  res.status(200).send({ msg: "Welcome" });
});

module.exports = apiRouter;
