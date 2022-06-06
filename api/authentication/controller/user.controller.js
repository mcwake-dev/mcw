const dayjs = require("dayjs");

const {
  generateHash,
  generateJti,
  generateToken,
} = require("@mcw/cryptographic");
const { sendMail } = require("@mcw/email");
const generateTemplate = require("../template/passwordless");
const { log } = require("@mcw/logging");

module.exports = ({ model: { isTokenBlocked } }) => {
  async function requestLoginToken({ email, ip }) {
    const jti = generateJti();
    const hashedJti = generateHash(jti);
    const loginToken = generateToken({
      subject: email,
      jti: hashedJti,
      tokenType: "login",
      iat: dayjs() / 1000,
      exp: dayjs().add(60, "minutes") / 1000,
    });
    const { html, text } = generateTemplate({
      target: process.env.SENDGRID_TARGET,
      token: loginToken,
    });
    const emailProps = {
      apiKey: process.env.SENDGRID_API_KEY,
      message: {
        to: email,
        from: process.env.SENDGRID_FROM,
        subject: "MCW Authentication Request",
        text,
        html,
      },
    };
    await sendMail(emailProps);

    return { jti };
  }

  return Object.freeze({
    requestLoginToken,
  });
};
