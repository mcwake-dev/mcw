const { Joi } = require("celebrate");

const usernameSchema = Joi.string().alphanum().min(3).max(30).messages({
  "string.base":
    "Username should contain only alphanumeric characters, e.g. amy1234",
  "string.empty": "Username cannot be empty",
  "string.min": "Username must be at least 3 characters",
  "string.max": "Username cannot have more than 30 characters",
  "any.required": "Username is a required field",
});

const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .max(254)
  .required()
  .messages({
    "string.empty": "Email cannot be empty",
    "string.max": "Email cannot be more than 254 characters",
    "string.email": "Email must be a valid email address",
    "any.required": "Email cannot be empty",
  });

const emailRemoteSchema = (userServiceUrl) =>
  emailSchema.external(async (value, helpers) => {
    const response = await fetch(`${userServiceUrl}/available/email/${value}`);
    const data = await response.json();

    if (data.available) {
      const err = new Error("No account associated with this email address");
      err.name = "ValidationError";
      throw err;
    }

    return value;
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

const userRemoteSchema = (userServiceUrl) =>
  Joi.object({
    username: usernameSchema.external(async (value, helpers) => {
      const response = await fetch(
        `${userServiceUrl}/available/username/${value}`
      );
      const data = await response.json();

      if (data.available) {
        return value;
      }

      const err = new Error("Username not available");
      err.name = "ValidationError";

      throw err;
    }),
    email: emailSchema.external(async (value, helpers) => {
      const response = await fetch(
        `${userServiceUrl}/available/email/${value}`
      );
      const data = await response.json();

      if (data.available) {
        return value;
      }

      const err = new Error("Email already in use");
      err.name = "ValidationError";

      throw err;
    }),
    first_name: nameSchema,
    surname: nameSchema,
  });

module.exports = {
  usernameSchema,
  emailSchema,
  emailRemoteSchema,
  nameSchema,
  userSchema,
  userRemoteSchema,
};
