const db = require("../connection.js");

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
      slug VARCHAR(50) PRIMARY KEY,
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
      description VARCHAR (1000) NOT NULL,
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
