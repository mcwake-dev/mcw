const { log } = require("@mcw/logging");

module.exports = async ({ db }) => {
  const { REFRESHTOKEN_TTL } = process.env;
  const BLOCKED = "blocked-tokens";

  const blockToken = async ({ token }) => {
    const lg = log.getLogger("model:token:blockToken");
    const result = await db.collection(BLOCKED).insertOne({
      createdAt: Date.now(),
      token: token,
    });

    lg.info(`Token Blocked`);

    return result;
  };

  const isTokenBlocked = async ({ token }) => {
    const lg = log.getLogger("model:token:isBlocked");
    const result = await db.collection(BLOCKED).find({ token });
    const isBlocked = result.length > 0;

    lg.info(`Token Blocked? ${isBlocked}`);

    return result.length > 0;
  };

  await db
    .collection(BLOCKED)
    .createIndex({ createdAt: 1 }, { expiresInSeconds: REFRESHTOKEN_TTL });

  return Object.freeze({
    blockToken,
    isTokenBlocked,
  });
};
