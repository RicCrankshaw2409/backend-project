const db = require("../connection");
const format = require("pg-format");
const { dropTables, createTables } = require("../utils/helper-seed-function");

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  await dropTables();
  await createTables();
  // 2. insert data
};

module.exports = seed;
