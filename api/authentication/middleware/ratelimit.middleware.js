const Redis = require("ioredis");
const redis = new Redis();

const ratelimit = async (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ipKey = `${ip}:rate`;

  const results = await redis.multi().setnx(ipKey, 10).get(ipKey).exec();

  const [setnxErr, newLimit] = results[0];
  const [getErr, result] = results[1];

  console.log(newLimit, result);

  if (newLimit) {
    await redis.expire(ipKey, 3600);
  }

  if (result > 0) {
    await redis.decrby(ipKey, 1);
    next();
  } else {
    const ttl = await redis.ttl(ipKey);
    res.status(403).send({
      message: `Rate Limit Exceeded - Please wait ${
        ttl / 60
      } minutes before trying again`,
    });
  }
};

module.exports = { ratelimit };
