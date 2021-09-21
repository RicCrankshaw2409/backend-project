const { fetchCategories } = require("../models/category_model");

exports.getCategories = async (req, res, next) => {
  const result = await fetchCategories();
  res.status(200).send({ categories: result });
};
