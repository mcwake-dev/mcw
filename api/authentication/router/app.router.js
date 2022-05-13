const express = require("express");
const router = express.Router();

router.get("/api/authentication/pk", (request, response) => {
  response.status(200).send({ public_key: process.env.JWT_PUBLIC_KEY });
});

module.exports = router;
