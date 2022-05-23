import { emailRemoteSchema } from "@mcw/validation/user.validation";
import errorHandler from "../../middleware/error.middleware";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { email } = req.body;
      const schema = emailRemoteSchema(process.env.VALIDATION_SERVER);
      const value = await schema.validateAsync(email);

      res.status(200).send({ success: true });
    }
  } catch (err) {
    errorHandler(err, res);
  }
}
