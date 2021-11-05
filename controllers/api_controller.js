const { readFile } = require("fs/promises");
const filePath = "../endpoints.json";

exports.getEndPoints = (req, res, next) => {
  try {
    readFile(filePath, "utf-8").then((fileContent) => {
      res.status(200).send(JSON.parse(fileContent));
    });
  } catch (err) {
    next(err);
  }
};
