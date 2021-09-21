const db = require("../db/connection");
const data = require("../db/data/test-data");
const { categoryData, commentData, reviewData, userData } = data;
const format = require("pg-format");
const { formatData } = require("../db/utils/data-manipulation");

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
});

describe("createQueryString", () => {});
