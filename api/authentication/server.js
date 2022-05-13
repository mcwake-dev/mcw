const express = require("express");
const app = express();
const router = require("./router/app.router.js");

app.use(router);

module.exports = app;
