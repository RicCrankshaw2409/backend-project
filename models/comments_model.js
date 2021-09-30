const e = require("express");
const db = require("../db/connection");
const { doesItExist } = require("../db/utils/input-verification");

exports.fetchReviewCommentsByReviewId = async (review_id) => {
  const reviewExists = await doesItExist("reviews", review_id);
  if (!reviewExists) {
    return Promise.reject({
      status: 404,
      msg: `No comments found with the review_id of ${review_id}`,
    });
  } else {
    const result = await db.query(
      "SELECT * FROM comments WHERE review_id = $1;",
      [review_id]
    );
    return result.rows;
  }
};

exports.addCommentsByReviewId = async (review_id, username, body) => {
  if (username === undefined || body === undefined) {
    return Promise.reject({
      status: 400,
      msg: "Missing required field from body",
    });
  } else {
    const reviewExists = await doesItExist("reviews", review_id);
    const userExists = await doesItExist("users", username);
    if (!reviewExists || !userExists) {
      if (!reviewExists) {
        return Promise.reject({
          status: 404,
          msg: `No reviews found with the review_id of ${review_id}`,
        });
      } else {
        return Promise.reject({
          status: 404,
          msg: `No users with the username of ${username} exists`,
        });
      }
    } else {
      const result = await db.query(
        `INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
        [review_id, username, body]
      );
      return result.rows[0];
    }
  }
};

exports.removeCommentsByCommentId = async (comment_id) => {
  const commentExist = await doesItExist("comments", comment_id);
  if (!commentExist) {
    return Promise.reject({
      status: 404,
      msg: `No comment found with the id ${comment_id}`,
    });
  } else {
    const result = await db.query(
      "DELETE FROM comments WHERE comment_id = $1 RETURNING *;",
      [comment_id]
    );
    return result.rows[0];
  }
};

exports.updateCommentById = async (comment_id, inc_votes) => {
  if (inc_votes === undefined || typeof inc_votes !== "number") {
    return Promise.reject({
      status: 400,
      msg: `Please submit a body of the correct format`,
    });
  } else {
    const commentExist = await doesItExist("comments", comment_id);
    if (!commentExist) {
      return Promise.reject({
        status: 404,
        msg: `No comment found with the comment_id ${comment_id}`,
      });
    } else {
      const result = await db.query(
        "UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;",
        [inc_votes, comment_id]
      );
      return result.rows[0];
    }
  }
};
