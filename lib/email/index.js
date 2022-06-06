const sgMail = require("@sendgrid/mail");

async function sendMail({ message, apiKey }) {
  sgMail.setApiKey(apiKey);

  const result = await sgMail.send(message);

  return result;
}

module.exports = { sendMail };
