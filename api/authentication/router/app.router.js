const express = require("express");
const { celebrate, Segments, errors, Joi } = require("celebrate");

const router = express.Router();

const {
  emailExists,
  usernameExists,
  register,
} = require("../controller/user.controller");
const {
  usernameSchema,
  emailSchema,
  userSchema,
} = require("@mcw/validation/user.validation");

router.get("/api/authentication/pk", (_request, response) => {
  response.status(200).send({ public_key: process.env.JWT_PUBLIC_KEY });
});
router.get(
  "/api/authentication/available/username/:username",
  celebrate({ [Segments.PARAMS]: Joi.object({ username: usernameSchema }) }),
  usernameExists
);
router.get(
  "/api/authentication/available/email/:email",
  celebrate({ [Segments.PARAMS]: Joi.object({ email: emailSchema }) }),
  emailExists
);
router.post(
  "/api/authentication/register",
  celebrate({ [Segments.BODY]: userSchema }),
  register
);
router.use(errors());

module.exports = router;
