const db = require("../connection.js");
const data = require("../data/development-data");
const format = require("pg-format");

exports.doesItExist = async (table, userInput) => {
  let result = "";
  if (table === "comments") {
    result = await db.query("SELECT * FROM comments WHERE comment_id = $1;", [
      userInput,
    ]);
  } else if (table === "reviews") {
    result = await db.query("SELECT * FROM reviews WHERE review_id = $1;", [
      userInput,
    ]);
  } else if (table === "users") {
    result = await db.query("SELECT * FROM users WHERE username = $1;", [
      userInput,
    ]);
  } else if (table === "categories") {
    result = await db.query("SELECT * FROM categories WHERE slug = $1;", [
      userInput,
    ]);
  }
  if (result.rows.length > 0) {
    return true;
  }
  return false;
};
