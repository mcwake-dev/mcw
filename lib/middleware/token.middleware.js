const { log } = require("@mcw/logging");
const { verifyToken } = require("@mcw/cryptographic");

const tokenRegex = new RegExp(/^Bearer\s[A-Za-z0-9\-]+$/);

function authorizationHeaderPresent(req, res, next) {
  const lg = log.getLogger("middleware:authorizationHeaderPresent");
  const { authorization } = req.headers;

  lg.info("Checking Authorization header");

  if (authorization) {
    lg.info("Authorization header present");
    next();
  } else {
    lg.warn("Authorization header not found");
    next(new Error("Missing Authorization header"));
  }
}

function authorizationHeaderValid(req, res, next) {
  const lg = log.getLogger("middleware:authorizationHeaderValid");
  const { authorization } = req.headers;

  lg.info("Validating Authorization header");

  const valid = tokenRegex.test(authorization);

  if (valid) {
    lg.info("Authorization header valid");
    next();
  } else {
    lg.warn("Authorization header invalid");
    next(new Error("Invalid Authorization header"));
  }
}

function tokenValid(req, res, next) {
  const lg = log.getLogger("middleware:tokenValid");

  lg.info("Extracting token");

  const token = req.headers.authorization.split(" ")[1];

  lg.info("Extracting JTI");

  const jti = req.signedCookies.jti;

  lg.info("Verifying token");

  try {
    const verified = verifyToken({ token, jti });

    req.verified = verified;

    next();
  } catch (err) {
    lg.warn("Error occurred while verifying token: ", err);
    next(err);
  }
}

module.exports = Object.freeze({
  authorizationHeaderPresent,
  authorizationHeaderValid,
  tokenValid,
});
