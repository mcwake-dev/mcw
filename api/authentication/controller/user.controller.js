const {
  usernameExists: dbUsernameExists,
  emailExists: dbEmailExists,
  register: dbRegister,
} = require("../model/user.model");

async function usernameExists(req, res) {
  const { username } = req.params;
  const [err, exists] = await dbUsernameExists(username);

  if (err) {
    res.status(500).send({ message: "Unknown DB error" });
  } else {
    res.status(200).send({ available: !exists });
  }
}

async function emailExists(req, res) {
  const { email } = req.params;
  const [err, exists] = await dbEmailExists(email);

  if (err) {
    res.status(500).send({ message: "Unknown DB error" });
  } else {
    res.status(200).send({ available: !exists });
  }
}

async function register(req, res) {
  const { username, email, first_name, surname } = req.body;
  const [err, newUser] = await dbRegister({
    username,
    email,
    first_name,
    surname,
  });

  if (err) {
    res.status(400).send({ err });
  } else {
    const { id } = newUser;
    res.status(201).send({ id, username });
  }
}

module.exports = { emailExists, usernameExists, register };
