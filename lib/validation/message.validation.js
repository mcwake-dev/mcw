const { Joi } = require("celebrate");
const emailSchema = require("./user.validation");

const emailSchema = Joi.object({
  apiKey: Joi.string().required(),
  message: Joi.object({
    to: emailSchema,
    from: emailSchema,
    subject: Joi.string().required().max(998).messages({
      "string.empty": "Subject cannot be empty",
      "string.max": "Name cannot be more than 998 characters",
      "any.required": "Subject is a required field",
    }),
    text: Joi.string().max(10000000).required().messages({
      "string.empty": "Email Text cannot be empty",
      "string.max": "Email Text cannot be more than 10,000,000 characters",
      "any.required": "Email Text is a required field",
    }),
    html: Joi.string().max(10000000).required().messages({
      "string.empty": "HTML Email Body cannot be empty",
      "string.max": "HTML Email Body cannot be more than 10,000,000 characters",
      "any.required": "HTML Email Body is a required field",
    }),
  }),
});

module.exports = { emailSchema };
