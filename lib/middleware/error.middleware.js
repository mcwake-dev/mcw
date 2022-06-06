function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).send({ message: err.message });
}

module.exports = Object.freeze({
  errorHandler,
});
