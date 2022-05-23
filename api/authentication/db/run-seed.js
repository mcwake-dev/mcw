const { seed } = require("./seed");
const { NODE_ENV } = process.env;
const log = require("@mcw/logging");
const devData = require("./data/development");
const lg = log.getLogger("RunSeed");
const testData = require("./data/testing");
let data;

switch (NODE_ENV) {
  case "development":
    lg.info("Using dev data");
    data = devData;
    break;
  case "test":
    lg.info("Using test data");
    data = testData;
    break;
}

seed(data)
  .then(() => {
    lg.info("Seeding complete");
  })
  .catch((err) => {
    lg.error(err);
  });
