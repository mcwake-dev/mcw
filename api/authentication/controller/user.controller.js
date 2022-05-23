const {
  usernameExists: dbUsernameExists,
  emailExists: dbEmailExists,
  register: dbRegister,
} = require("../model/user.model");
const log = require("@mcw/logging");

async function usernameExists(req, res) {
  const lg = log.getLogger("user.controller:usernameExists");
  const { username } = req.params;

  lg.info(`PARAM: ${username}`);

  const [err, exists] = await dbUsernameExists(username);

  lg.info(`Username exists in database?: ${exists}`);

  if (err) {
    lg.error(err.message);
    res.status(500).send({ message: "Unknown DB error" });
  } else {
    lg.info(`Query successful`);
    res.status(200).send({ available: !exists });
  }
}

async function emailExists(req, res) {
  const lg = log.getLogger("user.controller:emailExists");
  const { email } = req.params;

  lg.info(`PARAM: ${email}`);

  const [err, exists] = await dbEmailExists(email);

  lg.info(`Email exists in database?: ${exists}`);

  if (err) {
    lg.error(err.message);
    res.status(500).send({ message: "Unknown DB error" });
  } else {
    lg.info(`Query successful`);
    res.status(200).send({ available: !exists });
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

module.exports = { emailExists, usernameExists, register };
