const db = require("../connection.js");
const data = require("../data/development-data");
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
