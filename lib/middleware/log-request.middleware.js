const { log } = require("@mcw/logging");

function logRequest(req, res, next) {
  const lg = log.getLogger("middleware:request");

  lg.info(`PATH: ${req.path}`);

  if (process.env.NODE_ENV === "development") {
    lg.info(`HEADERS: ${JSON.stringify(req.headers)}`);
    lg.info(`BODY: ${JSON.stringify(req.body)}`);
    lg.info(`PARAMS: ${JSON.stringify(req.params)}`);
    lg.info(`COOKIES: ${JSON.stringify(req.cookies)}`);
    lg.info(`SIGNEDCOOKIES: ${JSON.stringify(req.signedCookies)}`);
  }

  next();
}

module.exports = Object.freeze({
  logRequest,
});
