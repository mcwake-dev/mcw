const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const setupController = require("./controller/user.controller");
const { cors } = require("@mcw/middleware/cors.middleware");
const { ratelimit } = require("@mcw/middleware/ratelimit.middleware");
const {
  emailPresent,
  emailValid,
} = require("@mcw/middleware/email.middleware");
const { jtiPresent, jtiValid } = require("@mcw/middleware/jti.middleware");
const {
  authorizationHeaderPresent,
  authorizationHeaderValid,
} = require("@mcw/middleware/token.middleware");
const { errorHandler } = require("@mcw/middleware/error.middleware");
const { logRequest } = require("@mcw/middleware/log-request.middleware");
const { generateJti } = require("@mcw/cryptographic");
const { tokenValid } = require("../../lib/middleware/token.middleware");
const { generateRandomString } = require("../../lib/cryptographic");

module.exports = async ({ model }) => {
  const app = express();
  const { requestLoginToken } = await setupController({
    model,
    app,
  });

  app.use(cookieParser(generateRandomString(100)));
  app.use(helmet());
  app.set("trust proxy", 1);
  app.use(cors);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(ratelimit);
  app.use(logRequest);
  app.post(
    "/api/authentication/request-login-token",
    emailPresent,
    emailValid,
    async (req, res) => {
      try {
        const { email } = req.body;
        const { jti } = await requestLoginToken({
          email,
          ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
        });

        res.cookie("jti", jti, {
          secure: process.env.NODE_ENV !== "development",
          httpOnly: true,
          sameSite: true,
          path: "/",
          signed: true,
        });
        res.sendStatus(201);
      } catch (err) {
        res.status(400).send({ message: err.message });
      }
    }
  );

  app.get(
    "/api/authentication/request-refresh-token",
    jtiPresent,
    jtiValid,
    authorizationHeaderPresent,
    authorizationHeaderValid,
    tokenValid,
    async (req, res) => {
      res.sendStatus(200);
    }
  );

  app.use(errorHandler);

  return app;
};
