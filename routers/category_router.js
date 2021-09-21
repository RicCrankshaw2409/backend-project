const categoryRouter = require("express").Router();
const { getCategories } = require("../controllers/category_controller");

categoryRouter.route("/").get(getCategories);

module.exports = categoryRouter;
