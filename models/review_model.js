const db = require("../db/connection");

exports.fetchReviewById = async (review_id) => {
  const result = await db.query("SELECT * FROM reviews WHERE review_id = $1;", [
    review_id,
  ]);
  if (!result.rows[0]) {
    return Promise.reject({
      status: 404,
      msg: `No user found with the id ${review_id}`,
    });
  }
  return result.rows[0];
};
