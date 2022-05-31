const db = require("../db");

async function usernameInUse(username) {
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

async function emailInUse(email) {
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

async function register({ username, email, first_name, surname }) {
  try {
    const results = await db.query(
      "INSERT INTO users (username, email, first_name, surname) VALUES ($1, $2, $3, $4) RETURNING id, username",
      [username, email, first_name, surname]
    );

    if (results.rows.length === 1) {
      return [null, results.rows[0]];
    } else {
      return [new Error("Unknown Database Error"), null];
    }
  } catch (err) {
    return [err, null];
  }
}

async function registerEmail({ email }) {
  try {
    await db.query(
      "INSERT INTO users (email) VALUES ($1) ON CONFLICT DO NOTHING;",
      [email]
    );

    const results = await db.query(
      "SELECT id, level, email FROM users WHERE email = $1",
      [email]
    );

    if (results.rows.length === 1) {
      console.log(results.rows[0]);
      return [null, results.rows[0]];
    } else {
      return [new Error("Unknown Database Error"), null];
    }
  } catch (err) {
    console.log(err);
    return [err, null];
  }
}

module.exports = {
  usernameInUse,
  emailInUse,
  register,
  registerEmail,
};
