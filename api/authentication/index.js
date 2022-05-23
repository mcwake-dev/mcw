const app = require("./app");
const log = require("@mcw/logging");
const { PORT } = process.env;

app.listen(PORT, () => {
  const lg = log.getLogger("api/authentication");

  lg.info(`Running on ${PORT}`);
});
