const { fetchCategories } = require("../models/category_model");

exports.getCategories = async (req, res, next) => {
  try {
    const result = await fetchCategories();
    res.status(200).send({ categories: result });
  } catch (error) {
    next(error);
  }
};
