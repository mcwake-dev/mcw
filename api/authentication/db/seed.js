const format = require("pg-format");
const db = require("../db");

async function destroy() {
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TYPE IF EXISTS user_level;`);

  return true;
}

const seed = async (users) => {
  await destroy();
  await db.query(`CREATE TYPE user_level AS ENUM('user', 'administrator');`);
  await db.query(`CREATE TABLE users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR,
        email VARCHAR NOT NULL UNIQUE,
        first_name VARCHAR,
        surname VARCHAR,
        level user_level DEFAULT 'user'
    );`);
  const insert = format(
    `INSERT INTO users (username, email, first_name, surname) VALUES %L RETURNING *;`,
    users.map(({ username, email, first_name, surname }) => [
      username,
      email,
      first_name,
      surname,
    ])
  );

  await db.query(insert);

  await db.end();
};

module.exports = { seed, destroy };
