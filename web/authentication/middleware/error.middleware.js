export default function errorHandler(err, res) {
  switch (err.name) {
    case "ValidationError":
      return res.status(400).send({ message: err.message });
    default:
      return res.status(500).send({ message: "Unknown Server Error" });
  }
}
