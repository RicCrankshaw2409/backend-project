const express = require("express");
const { handle400Error, handleCustomError } = require("./errors/errors");

const app = express();

app.use(express.json());

const apiRouter = require("./routers/api_router");

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Incorrect URL provided" });
});

app.use(handleCustomError);
app.use(handle400Error);

module.exports = app;
