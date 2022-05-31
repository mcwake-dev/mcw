const sgMail = require("@sendgrid/mail");
const { emailSchema } = require("@mcw/validation/user.validation");

async function sendMail({ message, apiKey }) {
  try {
    const valid = emailSchema.validate({ message, apiKey });

    sgMail.setApiKey(apiKey);

    const result = await sgMail.send(message);

    return [null, result];
  } catch (err) {
    return [err, null];
  }
}

module.exports = { sendMail };
