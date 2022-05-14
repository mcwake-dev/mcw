const Joi = require("joi");

const usernameSchema = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required()
  .messages({
    "string.base":
      "Username should contain only alphanumeric characters, e.g. amy1234",
    "string.empty": "Username cannot be empty",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username cannot have more than 30 characters",
    "any.required": "Username is a required field",
  });
const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email address",
  });

module.exports = {
  usernameSchema,
  emailSchema,
};
