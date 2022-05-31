const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const forge = require("node-forge");

const { log } = require("@mcw/logging");
const {
  usernameInUse: dbUsernameInUse,
  emailInUse: dbEmailInUse,
  register: dbRegister,
  registerEmail: dbRegisterEmail,
} = require("../model/user.model");
const { passwordless } = require("../template/passwordless");
const { sendMail } = require("@mcw/email");

async function emailInUse(req, res) {
  const lg = log.getLogger("user.controller:emailInUse");
  const { email } = req.params;

  lg.info(`PARAM: ${email}`);

  const [err, inUse] = await dbEmailInUse(email);

  lg.info(`Email in use in database?: ${inUse}`);

  if (err) {
    lg.error(err.message);
    res.status(500).send({ message: "Unknown DB error" });
  } else {
    lg.info(`Query successful`);
    res.status(200).send({ inUse });
  }
}

async function usernameInUse(req, res) {
  const lg = log.getLogger("user.controller:usernameInUse");
  const { username } = req.params;

  lg.info(`PARAM: ${username}`);

  const [err, inUse] = await dbUsernameInUse(username);

  lg.info(`Username in use in database?: ${inUse}`);

  if (err) {
    lg.error(err.message);
    res.status(500).send({ message: "Unknown DB error" });
  } else {
    lg.info(`Query successful`);
    res.status(200).send({ inUse });
  }
}

async function register(req, res) {
  const lg = log.getLogger("user.controller:register");
  const { username, email, first_name, surname } = req.body;

  lg.info(`BODY: ${username} ${email} ${first_name} ${surname}`);

  const [err, newUser] = await dbRegister({
    username,
    email,
    first_name,
    surname,
  });

  lg.info(`User registered`);

  if (err) {
    lg.error(err.message);
    res.status(400).send({ err });
  } else {
    const { id } = newUser;

    lg.info("Registration successful");

    res.status(201).send({ id, username });
  }
}

async function requestToken(req, res) {
  const { email } = req.body;
  const [err, { id, level }] = await dbRegisterEmail({ email });

  console.log(err);

  // Create JTI
  const jti = uuidv4().toString();

  console.log(jti);

  // Set JTI Cookie
  res.cookie("jti", jti, {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    sameSite: true,
    path: "/",
  });

  // Create Refresh Token
  const hasher = forge.md.sha512.create();

  hasher.update(jti);

  const payload = {
    id,
    email,
    level,
    jti: forge.util.encode64(hasher.digest().data),
  };

  const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);

  // Send Email
  const message = {
    apiKey: process.env.SENDGRID_API_KEY,
    message: {
      to: email,
      from: process.env.SENDGRID_FROM,
      subject: "MCW - Authentication Request",
      text: `Please copy the following link to your web browser: ${process.env.SENDGRID_TARGET}`,
      html: passwordless({
        target: process.env.SENDGRID_TARGET,
        token,
        unsubscribe: "",
      }),
    },
  };

  const [emailErr, result] = await sendMail(message);

  console.log(emailErr);

  // Return result
  res.send({ token });
}

module.exports = { emailInUse, usernameInUse, register, requestToken };
