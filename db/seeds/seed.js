const db = require("../connection");
const format = require("pg-format");
const {
  dropTables,
  createTables,
  insertDataIntoTables,
} = require("../utils/helper-seed-function");

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  await dropTables();
  await createTables();
  await insertDataIntoTables(categoryData, commentData, reviewData, userData);
};

module.exports = seed;
