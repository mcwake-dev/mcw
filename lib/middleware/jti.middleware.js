const { log } = require("@mcw/logging");
const uuidRegex = new RegExp(
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
);

function jtiPresent(req, res, next) {
  const lg = log.getLogger("middleware:jtiPresent");
  const { jti } = req.signedCookies;

  lg.info("Checking if JTI has been provided");

  if (jti) {
    lg.info("JTI provided, proceeding...");
    next();
  } else {
    lg.warn("JTI is not present");
    next(new Error("JTI is required"));
  }
}

function jtiValid(req, res, next) {
  const lg = log.getLogger("middleware:jtiValid");
  const { jti } = req.signedCookies;

  lg.info("Validating JTI");

  const valid = uuidRegex.test(jti);

  if (valid) {
    lg.info("JTI valid, proceeding...");
    next();
  } else {
    lg.warn("Invalid JTI, erroring...");
    next(new Error("Invalid JTI provided"));
  }
}

module.exports = Object.freeze({
  jtiPresent,
  jtiValid,
});
