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
        comments: {
          DELETE: "/api/comments/:comment_id",
          PATCH: "/api/comments/:comment_id",
        },
        users: {
          GET: "/api/users",
          GET: "/api/users/:username",
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
