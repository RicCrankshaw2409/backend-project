const express = require("express");
// require in controllers

const app = express();

app.use(express.json());

const apiRouter = require("./routers/api_router");
// app paths here
app.use("/api", apiRouter);

module.exports = app;
