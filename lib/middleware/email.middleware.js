const { log } = require("@mcw/logging");
const emailRegex = new RegExp(
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
);

function emailPresent(req, res, next) {
  const lg = log.getLogger("middleware:emailPresent");
  const { email } = req.body;

  lg.info("Checking if email address has been provided");

  if (!email) {
    lg.warn("Email address missing");
    next(new Error("Email address is required"));
  } else {
    lg.info("Email address provided, proceeding...");
    next();
  }
}

function emailValid(req, res, next) {
  const lg = log.getLogger("middleware:emailValid");
  const { email } = req.body;

  lg.info("Validating email");

  const valid = emailRegex.test(email);

  if (valid) {
    lg.info("Email address valid, proceeding...");
    next();
  } else {
    lg.warn("Invalid email address, erroring...");
    next(new Error("Email address invalid"));
  }
}

module.exports = Object.freeze({
  emailPresent,
  emailValid,
});
