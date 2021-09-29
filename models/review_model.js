const db = require("../db/connection");
const reviews = require("../db/data/test-data/reviews");

exports.fetchReviews = async (
  sort_by = "created_at",
  order = "DESC",
  category
) => {
  const validColumns = [
    "review_id",
    "title",
    "review_img_url",
    "votes",
    "category",
    "owner",
    "created_at",
    "comment_count",
  ];
  const validOrder = ["DESC", "ASC"];
  const categorySearch = await db.query(
    `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, Count(comments.review_id) AS comment_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id
    WHERE category = $1
    GROUP BY reviews.review_id;`,
    [category]
  );
  if (categorySearch.rows.length > 0) {
    return categorySearch.rows;
  } else {
    if (!validColumns.includes(sort_by) || !validOrder.includes(order)) {
      return Promise.reject({ status: 400, msg: "Bad request" });
    }
    let queryStr = `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, Count(comments.review_id) AS comment_count
    FROM reviews 
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY ${sort_by} ${order};`;
    const result = await db.query(queryStr);
    return result.rows;
  }
};

exports.fetchReviewById = async (review_id) => {
  const result = await db.query(
    ` SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, Count(comments.review_id) AS comment_count 
FROM reviews 
LEFT JOIN comments 
ON reviews.review_id = comments.review_id 
WHERE reviews.review_id = $1
GROUP BY reviews.review_id;`,
    [review_id]
  );
  if (!result.rows[0]) {
    return Promise.reject({
      status: 404,
      msg: `No review found with the id ${review_id}`,
    });
  }
  return result.rows[0];
};

exports.updateReviewById = async (review_id, votes) => {
  if (votes) {
    const result = await db.query(
      "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;",
      [votes, review_id]
    );
    if (!result.rows[0]) {
      return Promise.reject({
        status: 404,
        msg: `No user found with the id ${review_id}`,
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
