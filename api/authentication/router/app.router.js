const express = require("express");
const router = express.Router();

const {
  usernameExists,
  emailExists,
  register,
} = require("../controller/user.controller");

router.get("/api/authentication/pk", (request, response) => {
  response.status(200).send({ public_key: process.env.JWT_PUBLIC_KEY });
});

router.get("/api/authentication/exists/username/:username", usernameExists);

router.get("/api/authentication/exists/email/:email", emailExists);

router.post("/api/authentication/register", register);

module.exports = router;
