const { seed } = require("./seed");
const { NODE_ENV } = process.env;
const devData = require("./data/development");
const testData = require("./data/testing");
let data;

switch (NODE_ENV) {
  case "development":
    data = devData;
    break;
  case "test":
    data = testData;
    break;
}

seed(data)
  .then(() => {
    console.log("Seeding complete");
  })
  .catch((err) => {
    console.error(err);
  });
