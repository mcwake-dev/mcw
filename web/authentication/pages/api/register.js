import errorHandler from "../../middleware/error.middleware";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { username, email, first_name, surname } = req.body;
      const response = await fetch(
        `${process.env.VALIDATION_SERVER}/api/authentication/register`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, first_name, surname }),
        }
      );

      res.status(200).send({ success: true });
    }
  } catch (err) {
    errorHandler(err, res);
  }
}
