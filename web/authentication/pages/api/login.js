import errorHandler from "../../middleware/error.middleware";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { email } = req.body;
      const response = await fetch(
        `${process.env.VALIDATION_SERVER}/api/authentication/login`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      res.status(200).send({ success: true });
    }
  } catch (err) {
    errorHandler(err, res);
  }
}
