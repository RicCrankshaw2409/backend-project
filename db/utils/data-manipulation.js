// extract any functions you are using to manipulate your data, into this file
const db = require("../connection.js");
const data = require("../data/development-data");
const { categoryData, commentData, reviewData, userData } = data;
const format = require("pg-format");

exports.formatData = (dataName, arrayOfColumnNames) => {
  if (arrayOfColumnNames == []) {
    return [];
  } else {
    return dataName.map((data) => {
      const arrayOfValues = [];
      for (let i = 0; i < arrayOfColumnNames.length; i++) {
        arrayOfValues.push(data[arrayOfColumnNames[i]]);
      }
      return arrayOfValues;
    });
  }
};
