const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("GetCategories", () => {
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

describe("GetReviewsById", () => {
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
    expect(res.body.msg).toBe("No user found with the id 999");
  });
  test("400: Handles and invalid review_id", async () => {
    const res = await request(app).get("/api/reviews/invalid_url").expect(400);
    expect(res.body.msg).toBe("Invalid URL format");
  });
});
