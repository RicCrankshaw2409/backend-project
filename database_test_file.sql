\c nc_games_test

SELECT * FROM users;
SELECT * FROM categories;
SELECT * FROM reviews;
SELECT * FROM comments;

SELECT * FROM reviews ORDER BY review_id DESC;

SELECT * FROM comments WHERE review_id = 2;


SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, Count(comments.review_id) AS comment_count
FROM reviews
LEFT JOIN comments
ON reviews.review_id = comments.review_id
WHERE category = 
GROUP BY reviews.reviews_id;

SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, Count(comments.review_id) AS comment_count
FROM reviews 
LEFT JOIN comments
ON reviews.review_id = comments.review_id
ORDER BY 