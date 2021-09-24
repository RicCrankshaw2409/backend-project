const db = require("../db/connection");

exports.fetchReviewCommentsByReviewId = async (review_id) => {
  const result = await db.query(
    "SELECT * FROM comments WHERE review_id = $1;",
    [review_id]
  );
  if (result.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `No comments found with the review_id of ${review_id}`,
    });
  }
  return result.rows;
};

exports.addCommentsByReviewId = async (review_id, username, body) => {
  if (!review_id || !username || !body) {
    return Promise.reject({
      status: 400,
      msg: "Missing required field from body",
    });
  }
  const result = await db.query(
    `INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
    [review_id, username, body]
  );
  return result.rows[0];
};
