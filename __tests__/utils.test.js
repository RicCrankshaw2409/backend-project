const db = require("../db/connection");
const data = require("../db/data/test-data");
const { categoryData, commentData, reviewData, userData } = data;
const format = require("pg-format");
const { formatData } = require("../db/utils/data-manipulation");
const {
  doesUsernameExist,
  doesReviewIdExist,
  doesCommentIdExist,
  doesItExist,
} = require("../db/utils/input-verification");
const comments = require("../db/data/test-data/comments");

afterAll(() => db.end());

describe("FormatData", () => {
  test("Takes an array returns an array", () => {
    const actual = formatData([]);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  test("Takes the name of data and an array containing 1 column name from data, returns a nested array of values", () => {
    const actual = formatData(categoryData, ["slug"]);
    const expected = [
      ["euro game"],
      ["social deduction"],
      ["dexterity"],
      ["children's games"],
    ];
    expect(actual).toEqual(expected);
  });
  test("Takes the name of data and an array containing more than 1 column name from data, returns a nested array of values", () => {
    const actual = formatData(categoryData, ["slug", "description"]);
    const expected = [
      ["euro game", "Abstact games that involve little luck"],
      [
        "social deduction",
        "Players attempt to uncover each other's hidden role",
      ],
      ["dexterity", "Games involving physical skill"],
      ["children's games", "Games suitable for children"],
    ];
    expect(actual).toEqual(expected);
  });
  test("Does not mutate the initial array", () => {
    const actual = formatData(categoryData, ["slug"]);
    expect(categoryData).toEqual([
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
      {
        slug: "social deduction",
        description: "Players attempt to uncover each other's hidden role",
      },
      { slug: "dexterity", description: "Games involving physical skill" },
      { slug: "children's games", description: "Games suitable for children" },
    ]);
  });
});

describe("doesItExist", () => {
  test("Should return true if comment_id exists, false if not", async () => {
    let actual = await doesItExist("comments", 1);
    expect(actual).toBe(true);
    actual = await doesItExist("comments", 0);
    expect(actual).toBe(false);
  });
  test("Should return true if review_id exists, false if not", async () => {
    let actual = await doesItExist("reviews", 1);
    expect(actual).toBe(true);
    actual = await doesItExist("reviews", 0);
    expect(actual).toBe(false);
  });
  test("Should return true if username exists, false if not", async () => {
    let actual = await doesItExist("users", "mallionaire");
    expect(actual).toBe(true);
    actual = await doesItExist("users", "richard");
    expect(actual).toBe(false);
  });
});
