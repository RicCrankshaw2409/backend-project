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

exports.removeCommentsByCommentId = async (comment_id) => {
  console.log(comment_id);
  if (!comment_id) {
    return Promise.reject({
      status: 404,
      msg: `No comment found with the comment_id of ${comment_id}`,
    });
  }
  const result = await db.query(
    "DELETE FROM comments WHERE comment_id = $1 RETURNING *;",
    [comment_id]
  );
  return result.rows[0];
};

exports.updateCommentById = async (comment_id, inc_votes) => {
  if (inc_votes) {
    const result = await db.query(
      "UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;",
      [inc_votes, comment_id]
    );
    if (!result.rows[0]) {
      return Promise.reject({
        status: 404,
        msg: `No comment found with the id ${comment_id}`,
      });
    }
    return result.rows[0];
  } else {
    return Promise.reject({
      status: 400,
      msg: "Please submit a body of the correct format",
    });
  }
};
