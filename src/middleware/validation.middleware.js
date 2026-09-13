const validateRequiredFields = (model) => {
  return (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      const error = new Error("Request body is required");
      error.statusCode = 400;
      return next(error);
    }

    const allowedFields = Object.keys(model);

    // Check for extra fields
    for (const field of Object.keys(req.body)) {
      if (!allowedFields.includes(field)) {
        const error = new Error(`${field} is not allowed`);
        error.statusCode = 400;
        return next(error);
      }
    }

    // Check required fields
    for (const [field, rules] of Object.entries(model)) {
      if (
        rules.required &&
        (req.body[field] === undefined ||
          req.body[field] === null ||
          req.body[field] === "")
      ) {
        const error = new Error(`${field} is required`);
        error.statusCode = 400;
        return next(error);
      }
    }

    next();
  };
};

module.exports = validateRequiredFields;