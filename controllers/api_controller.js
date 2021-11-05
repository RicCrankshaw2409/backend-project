const { readFile } = require("fs/promises");

exports.getEndPoints = (req, res, next) => {
  try {
    readFile("./endpoints.json", "utf-8").then((fileContent) => {
      console.log(fileContent);
      res.status(200).send(JSON.parse(fileContent));
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
