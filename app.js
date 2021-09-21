const express = require("express");

const app = express();

app.use(express.json());

const apiRouter = require("./routers/api_router");

app.use("/api", apiRouter);

module.exports = app;
