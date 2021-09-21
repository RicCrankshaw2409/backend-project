const express = require("express");

// require in controllers

const app = express();

app.use(express.json());

// app paths here

module.exports = app;
