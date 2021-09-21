const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");

console.log(testData);
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
});
