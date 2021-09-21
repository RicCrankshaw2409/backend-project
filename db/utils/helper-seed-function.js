const db = require("../connection.js");
const data = require("../data/development-data");
const format = require("pg-format");
const { categoryData, commentData, reviewData, userData } = data;

exports.dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS users cascade;`);
  await db.query(`DROP TABLE IF EXISTS categories cascade;`);
  await db.query(`DROP TABLE IF EXISTS reviews cascade;`);
  await db.query(`DROP TABLE IF EXISTS comments cascade;`);
  console.log("All tables deleted");
};

exports.createTables = async () => {
  await db.query(
    `CREATE TABLE categories(
      slug VARCHAR(100) PRIMARY KEY,
      description VARCHAR(1000) NOT NULL
      );`
  );
  await db.query(`CREATE TABLE users (
      username VARCHAR(50) PRIMARY KEY,
      avatar_url VARCHAR (1000) NOT NULL,
      name VARCHAR (50) NOT NULL
      );`);
  await db.query(`CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title VARCHAR (100) NOT NULL,
      review_body VARCHAR (1000) NOT NULL,
      designer VARCHAR (1000) NOT NULL,
      review_img_url VARCHAR (500) NOT NULL,
      votes INT,
      category VARCHAR(50),
      FOREIGN KEY (category) REFERENCES categories (slug),
      owner VARCHAR(50),
      FOREIGN KEY (owner) REFERENCES users (username),
      created_at TIMESTAMPTZ 
      );`);
  await db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(50),
      FOREIGN KEY (author) REFERENCES users (username),
      review_id INT,
      FOREIGN KEY (review_id) REFERENCES reviews (review_id),
      votes INT,
      created_at DATE NOT NULL,
      body VARCHAR (1000) NOT NULL
      );`);
  console.log("All tables created");
};

exports.insertDataIntoTables = async () => {
  const categoryDataArray = categoryData.map((category) => {
    return [category.slug, category.description];
  });
  let queryStr = format(
    `INSERT INTO categories (slug, description) VALUES %L;`,
    categoryDataArray
  );
  await db.query(queryStr);
  console.log("Category table populated with data");
  const userDataArray = userData.map((users) => {
    return [users.username, users.avatar_url, users.name];
  });
  queryStr = format(
    `INSERT INTO users (username, avatar_url, name) VALUES %L;`,
    userDataArray
  );
  await db.query(queryStr);
  console.log("User table populated with data");
  const reviewsDataArray = reviewData.map((reviews) => {
    return [
      reviews.title,
      reviews.designer,
      reviews.owner,
      reviews.review_img_url,
      reviews.review_body,
      reviews.category,
      reviews.created_at,
      reviews.votes,
    ];
  });
  queryStr = format(
    `INSERT INTO reviews (title, designer, owner, review_img_url, review_body, category, created_at, votes) VALUES %L;`,
    reviewsDataArray
  );
  await db.query(queryStr);
  console.log("Reviews table populated with data");
  const commentDataArray = commentData.map((comments) => {
    return [
      comments.body,
      comments.votes,
      comments.author,
      comments.review_id,
      comments.created_at,
    ];
  });
  queryStr = format(
    `INSERT INTO comments (body, votes, author, review_id, created_at) VALUES %L;`,
    commentDataArray
  );
  await db.query(queryStr);
  console.log("Reviews table populated with data");
};
