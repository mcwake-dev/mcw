const {
  usernameInUse: dbUsernameInUse,
  emailInUse: dbEmailInUse,
  register: dbRegister,
} = require("../model/user.model");
const { log } = require("@mcw/logging");

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

module.exports = { emailInUse, usernameInUse, register };
