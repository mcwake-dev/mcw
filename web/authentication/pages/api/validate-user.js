import { userRemoteSchema } from "@mcw/validation/user.validation";
import errorHandler from "../../middleware/error.middleware";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { username, email, first_name, surname } = req.body;
      const schema = userRemoteSchema(process.env.VALIDATION_SERVER);
      const value = await schema.validateAsync({
        username,
        email,
        first_name,
        surname,
      });

      res.status(200).send({ success: true });
    }
  } catch (err) {
    errorHandler(err, res);
  }
}
