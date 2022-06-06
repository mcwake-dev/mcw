import { log } from "@mcw/logging";

export default async function handler(req, res) {
  const lg = log.getLogger("nextapi:request-login-token");

  try {
    if (req.method === "POST") {
      lg.info("Received POST request");

      lg.info("Requesting token");
      const response = await fetch(
        `${process.env.VALIDATION_SERVER}/request-login-token`,
        {
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        lg.info("Token requested successfully");
        res.status(200).send({ ok: true });
      } else {
        throw new Error(`${data.message}`);
      }
    }
  } catch (err) {
    lg.error(err.messsage);
    errorHandler(err, res);
  }
}
