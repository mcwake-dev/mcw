const sgMail = require("@sendgrid/mail");

async function sendMail({ message, apiKey }) {
  try {
    const [err, valid] = emailSchema.validate({ message, apiKey });

    if (err) {
      return [err, null];
    } else {
      sgMail.setApiKey(apiKey);

      try {
        const result = await sgMail.send(message);

        return [null, result];
      } catch (err) {
        return [err, null];
      }
    }
  } catch (err) {
    return [err, null];
  }
}

module.exports = { sendMail };
