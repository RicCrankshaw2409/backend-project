const userRouter = require("express").Router();
const {
  getUsers,
  getUsersByUsername,
} = require("../controllers/user_controller");

userRouter.route("/").get(getUsers);
userRouter.route("/:username").get(getUsersByUsername);

module.exports = userRouter;
