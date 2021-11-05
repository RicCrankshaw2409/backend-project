const db = require("../connection.js");
const data = require("../data/development-data");
const format = require("pg-format");
const { formatData } = require("./data-manipulation");

exports.dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS users cascade;`);
  await db.query(`DROP TABLE IF EXISTS categories cascade;`);
  await db.query(`DROP TABLE IF EXISTS reviews cascade;`);
  await db.query(`DROP TABLE IF EXISTS comments cascade;`);
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
      review_body VARCHAR (10000) NOT NULL,
      designer VARCHAR (1000) NOT NULL,
      review_img_url VARCHAR (1000) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      votes INT DEFAULT 0,
      category VARCHAR(50),
      FOREIGN KEY (category) REFERENCES categories (slug),
      owner VARCHAR(50),
      FOREIGN KEY (owner) REFERENCES users (username),
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP 
      );`);
  await db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(50),
      FOREIGN KEY (author) REFERENCES users (username),
      review_id INT,
      FOREIGN KEY (review_id) REFERENCES reviews (review_id) ON DELETE CASCADE,
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body VARCHAR (1000) NOT NULL
      );`);
};

exports.insertDataIntoTables = async (
  categoryData,
  commentData,
  reviewData,
  userData
) => {
  let queryStr = format(
    `INSERT INTO categories (slug, description) VALUES %L;`,
    formatData(categoryData, ["slug", "description"])
  );
  await db.query(queryStr);

  queryStr = format(
    `INSERT INTO users (username, avatar_url, name) VALUES %L;`,
    formatData(userData, ["username", "avatar_url", "name"])
  );
  await db.query(queryStr);

  queryStr = format(
    `INSERT INTO reviews (title, designer, owner, review_img_url, review_body, category, created_at, votes) VALUES %L;`,
    formatData(reviewData, [
      "title",
      "designer",
      "owner",
      "review_img_url",
      "review_body",
      "category",
      "created_at",
      "votes",
    ])
  );
  await db.query(queryStr);

  queryStr = format(
    `INSERT INTO comments (body, votes, author, review_id, created_at) VALUES %L;`,
    formatData(commentData, [
      "body",
      "votes",
      "author",
      "review_id",
      "created_at",
    ])
  );
  await db.query(queryStr);
};
