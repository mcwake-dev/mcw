const express = require("express");
const app = express();
const router = require("./router/app.router.js");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

module.exports = app;
