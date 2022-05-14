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

const nameSchema = Joi.string().min(1).max(100).messages({
  "string.empty": "Name cannot be empty",
  "string.min": "Name must contain at least 1 character",
  "string.max": "Name cannot be more than 100 characters",
  "any.required": "Names are a required field",
});

const userSchema = Joi.object({
  username: usernameSchema,
  email: emailSchema,
  first_name: nameSchema,
  surname: nameSchema,
});

module.exports = {
  usernameSchema,
  emailSchema,
  nameSchema,
  userSchema,
};
