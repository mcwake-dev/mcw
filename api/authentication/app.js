const express = require("express");
const cors = require("cors");

const { ratelimit } = require("./middleware/ratelimit.middleware");
const router = require("./router/app.router.js");
const app = express();

app.use(
  cors((req, callback) => {
    let corsOptions = { origin: false };

    if (process.env.ALLOWLIST.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true };
    }

    callback(null, corsOptions);
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(ratelimit);
app.use(router);

module.exports = app;
