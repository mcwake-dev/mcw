const {
  usernameExists: dbUsernameExists,
  emailExists: dbEmailExists,
} = require("../model/user.model");
const { validate } = require("@mcw/validation");
const {
  usernameSchema,
  emailSchema,
} = require("@mcw/validation/user.validation");

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
      exists ? res.status(200).send({ exists: true }) : res.sendStatus(404);
    }
  }
}

async function emailExists(req, res) {
  const { email } = req.params;
  let [err, _result] = await validate(emailSchema, email);

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

module.exports = { usernameExists, emailExists };
