const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("getCategories", () => {
  test("200: should respond with an object containing a key of categories and all categories as the value ", async () => {
    const res = await request(app).get("/api/categories").expect(200);
    expect(res.body.categories).toHaveLength(4);
    expect(res.body.categories).toEqual([
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
      {
        slug: "social deduction",
        description: "Players attempt to uncover each other's hidden role",
      },
      { slug: "dexterity", description: "Games involving physical skill" },
      {
        slug: "children's games",
        description: "Games suitable for children",
      },
    ]);
  });
  test("404: Incorrect path responds with 404 error code", async () => {
    const res = await request(app).get("/api/incorrect_url").expect(404);
    expect(res.body.msg).toBe("Incorrect URL provided");
  });
});

describe("getReviewsById", () => {
  test("200: should respond with an object containing a review with one review that matches the id", async () => {
    const res = await request(app).get("/api/reviews/4").expect(200);
    expect(res.body.review).toMatchObject({
      owner: "mallionaire",
      title: "Dolor reprehenderit",
      review_id: 4,
      review_body:
        "Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur duis ullamco labore ipsum nisi voluptate nulla eu veniam. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Cillum aliquip quis aute enim anim ex laborum officia. Aliqua magna elit reprehenderit Lorem elit non laboris irure qui aliquip ad proident. Qui enim mollit Lorem labore eiusmod",
      designer: "Gamey McGameface",
      review_img_url:
        "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      category: "social deduction",
      created_at: "2021-01-22T11:35:50.936Z",
      votes: 7,
    });
  });
  test("404: Handles a review_id that does not exists", async () => {
    const res = await request(app).get("/api/reviews/999").expect(404);
    expect(res.body.msg).toBe("No review found with the id 999");
  });
  test("400: Handles and invalid review_id", async () => {
    const res = await request(app).get("/api/reviews/invalid_url").expect(400);
    expect(res.body.msg).toBe("Invalid URL format");
  });
});

describe("patchReviewsById", () => {
  test("200: should take a patch request and return the updated object", async () => {
    const res = await request(app)
      .patch("/api/reviews/2")
      .send({ inc_votes: 50 })
      .expect(200);

    expect(res.body.updatedReview.votes).toBe(55);
  });
  test("200: Can handle decrementing the votes and return the updated object", async () => {
    const res = await request(app)
      .patch("/api/reviews/2")
      .send({ inc_votes: -4 })
      .expect(200);

    expect(res.body.updatedReview.votes).toBe(1);
  });
  test("400: Missing required body returns 400 error", async () => {
    const res = await request(app).patch("/api/reviews/2").send({}).expect(400);

    expect(res.body.msg).toBe("Please submit a body of the correct format");
  });
  test("400: If the body is incorrect type returns 400 error", async () => {
    const res = await request(app)
      .patch("/api/reviews/2")
      .send({ inc_votes: "word" })
      .expect(400);
  });
});

describe("getReviews ", () => {
  test("200: Should respond with an array of review objects", async () => {
    const res = await request(app).get("/api/reviews").expect(200);

    expect(res.body.reviews).toHaveLength(13);
    res.body.reviews.forEach((review) => {
      expect(review).toMatchObject({
        owner: expect.any(String),
        title: expect.any(String),
        review_id: expect.any(Number),
        review_body: expect.any(String),
        designer: expect.any(String),
        review_img_url: expect.any(String),
        category: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
      });
    });
  });
  test("200: Should accept the sort_by query", async () => {
    const res = await request(app)
      .get("/api/reviews?sort_by=votes")
      .expect(200);

    expect(res.body.reviews[0].title).toBe(
      "Scythe; you're gonna need a bigger table!"
    );
  });
  test("200: Should accept an order query, which can be set to either asc or desc, defaults to descending", async () => {
    const res = await request(app)
      .get("/api/reviews?sort_by=review_id&order=DESC")
      .expect(200);

    expect(res.body.reviews[0].title).toBe(
      "Settlers of Catan: Don't Settle For Less"
    );
  });
  test("200: Should filter reviews by given category", async () => {
    const res = await request(app)
      .get("/api/reviews?category=social deduction")
      .expect(200);

    expect(res.body.reviews).toHaveLength(11);
  });
});

describe("getReviewCommentsByReviewId", () => {
  test("Should return with all the comments, with the matching review_id", async () => {
    const res = await request(app).get("/api/reviews/2/comments").expect(200);
    expect(res.body.comments).toHaveLength(3);
  });
  test("404: Should return 404 message if review_id cannot be found", async () => {
    const res = await request(app).get("/api/reviews/764/comments").expect(404);
    expect(res.body.msg).toBe("No comments found with the review_id of 764");
  });
  test("400: Should return 400 if given an invalid review_id type", async () => {
    const res = await request(app)
      .get("/api/reviews/invalid_url/comments")
      .expect(400);
    expect(res.body.msg).toBe("Invalid URL format");
  });
});

describe("postCommentByReviewId", () => {
  test("200: Should respond with an the updated comment", async () => {
    const res = await request(app)
      .post("/api/reviews/2/comments")
      .send({ username: "dav3rid", body: "Excellent game hours of fun" })
      .expect(200);
    expect(res.body.comment.author).toBe("dav3rid");
    expect(res.body.comment.body).toBe("Excellent game hours of fun");
  });
  test("400: Should respond with a 400 error msg when not provided the correct body", async () => {
    const res = await request(app)
      .post("/api/reviews/2/comments")
      .send({})
      .expect(400);
    expect(res.body.msg).toBe("Missing required field from body");
  });
});

describe("getApi", () => {
  test("200: responds with all available end-points", async () => {
    const res = await request(app).get("/api").expect(200);
    expect(res.body).toEqual({
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
  });
});

describe("deleteCommentsByCommentId", () => {});
