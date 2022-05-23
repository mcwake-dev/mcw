const Redis = require("ioredis");
const log = require("@mcw/logging");
const redis = new Redis();

const ratelimit = async (req, res, next) => {
  const lg = log.getLogger("ratelimit");
  const { RATELIMIT, RATETIME } = process.env;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ipKey = `${ip}:rate`;

  lg.info(`Checking rate for ${ip}`);

  const results = await redis
    .multi()
    .setnx(ipKey, parseInt(RATELIMIT))
    .get(ipKey)
    .exec();

  const [[setnxErr, newLimit], [getErr, result]] = results;

  if (newLimit) {
    lg.info("Setting expiry for new client");
    await redis.expire(ipKey, parseInt(RATETIME));
  }

  if (result > 0) {
    lg.info("Calls still available, decrementing");
    await redis.decrby(ipKey, 1);

    lg.info("Advancing to next");
    next();
  } else {
    lg.info("Rate exceeded");
    const ttl = await redis.ttl(ipKey);

    res.status(403).send({
      message: `Rate Limit Exceeded - Please wait ${
        ttl / 60
      } minutes before trying again`,
    });
  }
};

module.exports = { ratelimit };
