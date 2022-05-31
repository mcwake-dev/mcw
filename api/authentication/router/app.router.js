const express = require("express");
const { celebrate, Segments, errors, Joi } = require("celebrate");

const router = express.Router();

const { emailInUse, requestToken } = require("../controller/user.controller");

const { emailSchema, userSchema } = require("@mcw/validation/user.validation");

router.get("/api/authentication/pk", (_request, response) => {
  response.status(200).send({ public_key: process.env.JWT_PUBLIC_KEY });
});

router.get(
  "/api/authentication/in-use/email/:email",
  celebrate({ [Segments.PARAMS]: Joi.object({ email: emailSchema }) }),
  emailInUse
);

router.post(
  "/api/authentication/request-token",
  celebrate({ [Segments.BODY]: Joi.object({ email: emailSchema }) }),
  requestToken
);

router.use(errors());

module.exports = router;
