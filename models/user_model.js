const db = require("../db/connection");
const users = require("../db/data/test-data/users");
const { doesItExist } = require("../db/utils/input-verification");

exports.fetchUsers = async () => {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
};

exports.fetchUsersByUsername = async (username) => {
  const userExist = await doesItExist("users", username);
  if (!userExist) {
    return Promise.reject({
      status: 404,
      msg: `User with username ${username} does not exist`,
    });
  } else {
    const result = await db.query("SELECT * FROM users WHERE username = $1;", [
      username,
    ]);
    return result.rows[0];
  }
};
