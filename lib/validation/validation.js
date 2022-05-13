async function validate(schema, value) {
  try {
    const result = await schema.validateAsync(value);

    return [null, result];
  } catch (err) {
    return [err, null];
  }
}

module.exports = { validate };
