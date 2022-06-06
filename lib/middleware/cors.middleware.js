const cors = require("cors");

module.exports = Object.freeze({
  cors: cors((req, callback) => {
    let corsOptions = { origin: false };

    if (process.env.ALLOWLIST.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true };
    }

    callback(null, corsOptions);
  }),
});
