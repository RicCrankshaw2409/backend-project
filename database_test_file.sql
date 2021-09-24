\c nc_games_test

SELECT * FROM users;
SELECT * FROM categories;
SELECT * FROM reviews;
SELECT * FROM comments;

SELECT * FROM reviews ORDER BY review_id DESC;

SELECT * FROM comments WHERE review_id = 2;