const { MongoClient } = require("mongodb");
const { log } = require("@mcw/logging");

module.exports = async () => {
  const lg = log.getLogger("db/mongodb");
  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();

  lg.info(`MongoDB Connection Established`);

  const db = client.db(process.env.MONGODB_DB);

  lg.info(`Database set to "${process.env.MONGODB_DB}"`);

  return { db };
};
