const forge = require("node-forge");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const commonPayload = {
  iss: "MCW Apps",
  aud: process.env.JWT_AUDIENCE,
};

function generateHash(input) {
  const hasher = forge.md.sha512.create();

  hasher.update(input);

  return forge.util.encode64(hasher.digest().data);
}

function generateJti() {
  const jti = uuidv4().toString();

  return jti;
}

function generateToken({ subject, jti, iat, exp }) {
  const payload = {
    ...commonPayload,
    sub: subject,
    jti,
    iat,
    exp,
  };
  const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
    algorithm: "RS512",
  });

  return token;
}

function verifyToken({ token, jti }) {
  const options = {
    algorithms: ["RS512"],
    issuer: "MCW Apps",
    audience: process.env.JWT_AUDIENCE,
    jti: generateHash(jti),
  };

  return jwt.verify(token, process.env.JWT_PUBLIC_KEY, options);
}

module.exports = Object.freeze({
  generateToken,
  verifyToken,
  generateJti,
  generateHash,
});
