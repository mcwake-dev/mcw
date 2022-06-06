const { PORT } = process.env;
const { log } = require("@mcw/logging");
const setupConnection = require("./db/connection");
const setupApp = require("./app");
const setupModel = require("./model/token.model");

(async () => {
  const lg = log.getLogger("api/authentication");
  const { db } = await setupConnection();
  const AuthenticationModel = await setupModel({ db });
  const app = await setupApp({ log, model: AuthenticationModel });

  app.listen(PORT, async () => {
    lg.info(`Running on ${PORT}`);
  });
})();
