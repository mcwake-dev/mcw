const {
  usernameExists: dbUsernameExists,
  emailExists: dbEmailExists,
  register: dbRegister,
} = require("../model/user.model");
const { validate } = require("@mcw/validation");
const {
  usernameSchema,
  emailSchema,
} = require("@mcw/validation/user.validation");
const { userSchema } = require("../../../lib/validation/user.validation");

async function usernameExists(req, res) {
  const { username } = req.params;
  let [err, _result] = await validate(usernameSchema, username);

  if (err) {
    res.status(400).send({ message: "Invalid username" });
  } else {
    const [err, exists] = await dbUsernameExists(username);

    if (err) {
      res.status(500).send({ message: "Unknown DB error" });
    } else {
      exists ? res.sendStatus(200) : res.sendStatus(404);
    }
  }
}

async function emailExists(req, res) {
  const { email } = req.params;
  const [err, _result] = await validate(emailSchema, email);

  if (err) {
    res.status(400).send({ message: "Invalid email" });
  } else {
    const [err, exists] = await dbEmailExists(email);

    if (err) {
      res.status(500).send({ message: "Unknown DB error" });
    } else {
      exists ? res.status(200).send({ exists: true }) : res.sendStatus(404);
    }
  }
}

async function register(req, res) {
  const { username, email, first_name, surname } = req.body;
  const [err, _result] = await validate(userSchema, {
    username,
    email,
    first_name,
    surname,
  });

  if (err) {
    console.log(err);
    res.status(400).send({ err });
  } else {
    const [err, newUser] = await dbRegister({
      username,
      email,
      first_name,
      surname,
    });

    if (err) {
      console.log(err);
      res.status(400).send({ err });
    } else {
      const { id } = newUser;
      res.status(201).send({ id, username });
    }
  }
}

module.exports = { usernameExists, emailExists, register };
