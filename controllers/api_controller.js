exports.getEndPoints = (req, res, next) => {
  try {
    res.status(200).send({
      end_points: {
        categories: {
          GET: "/api/categories",
        },
        reviews: {
          GET: "/api/reviews",
          GET: "/api/reviews/:review_id",
          GET: "/api/reviews/:review_id/comments",
          PATCH: "/api/reviews/review_id",
          POST: "/api/reviews/review_id/comments",
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
