const Joi = require("joi");

const usernameSchema = Joi.string().alphanum().min(3).max(30).required();
const emailSchema = Joi.string().email().required();

module.exports = {
  usernameSchema,
  emailSchema,
};
