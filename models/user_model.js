const db = require("../db/connection");
const users = require("../db/data/test-data/users");

exports.fetchUsers = async () => {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
};

exports.fetchUsersByUsername = async (username) => {
  if (!username) {
    return Promise.reject({
      status: 400,
      msg: "Please provide a valid username in the correct format",
    });
  }
  const result = await db.query("SELECT * FROM users WHERE username = $1;", [
    username,
  ]);
  return result.rows[0];
};
