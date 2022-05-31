import { emailSchema } from "@mcw/validation/user.validation";
import { log } from "@mcw/logging";
import errorHandler from "../../../middleware/error.middleware";

export default async function handler(req, res) {
  const lg = log.getLogger("nextapi:validate-email");

  try {
    if (req.method === "POST") {
      lg.info("Received POST request");

      const { email } = req.body;

      lg.info("Validating email");
      const validatedEmail = await emailSchema.validateAsync(email);

      lg.info("Checking if email address already has an account");
      const response = await fetch(
        `${process.env.VALIDATION_SERVER}/in-use/email/${validatedEmail}`
      );
      const data = await response.json();

      if (response.ok) {
        lg.info("Email validated");
        res.status(200).send({ inUse: data.inUse });
      } else {
        throw new Error(`${data.message}`);
      }
    }
  } catch (err) {
    lg.error(err.message);
    errorHandler(err, res);
  }
}
