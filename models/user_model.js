const db = require("../db/connection");
const users = require("../db/data/test-data/users");

exports.fetchUsers = async () => {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
};

exports.fetchUsersByUsername = async (username) => {
  const result = await db.query("SELECT * FROM users WHERE username = $1;", [
    username,
  ]);
  return result.rows[0];
};
