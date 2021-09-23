const db = require("../db/connection");

exports.fetchReviews = async (
  sort_by = "created_at",
  order = "DESC",
  category
) => {
  const validColumns = [
    "review_id",
    "title",
    "review_body",
    "designer",
    "review_img_url",
    "votes",
    "category",
    "owner",
    "created_at",
  ];
  const validOrder = ["DESC", "ASC"];
  const categorySearch = await db.query(
    "SELECT * FROM reviews WHERE category = $1",
    [category]
  );
  if (categorySearch.rows.length > 0) {
    return categorySearch.rows;
  } else {
    if (!validColumns.includes(sort_by) || !validOrder.includes(order)) {
      return Promise.reject({ status: 400, msg: "Bad request" });
    }
    let queryStr = `SELECT * FROM reviews ORDER BY ${sort_by} ${order};`;
    const result = await db.query(queryStr);
    return result.rows;
  }
};

exports.fetchReviewById = async (review_id) => {
  const result = await db.query("SELECT * FROM reviews WHERE review_id = $1;", [
    review_id,
  ]);
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
