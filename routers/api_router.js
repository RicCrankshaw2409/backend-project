const apiRouter = require("express").Router();
const categoryRouter = require("./category_router");
const reviewRouter = require("./review_router");
const commentRouter = require("./comment_router");
const userRouter = require("./user.router");
const app = require("../app");
const { getEndPoints } = require("../controllers/api_controller");

apiRouter.route("/").get(getEndPoints);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
