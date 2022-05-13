const db = require("../db");

async function usernameExists(username) {
  try {
    const results = await db.query("SELECT * FROM users WHERE username = $1;", [
      username,
    ]);

    if (results.rows.length > 0) {
      return [null, true];
    } else {
      return [null, false];
    }
  } catch (err) {
    return [err, null];
  }
}

async function emailExists(email) {
  try {
    const results = await db.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);

    if (results.rows.length > 0) {
      return [null, true];
    } else {
      return [null, false];
    }
  } catch (err) {
    return [err, null];
  }
}

module.exports = {
  usernameExists,
  emailExists,
};
