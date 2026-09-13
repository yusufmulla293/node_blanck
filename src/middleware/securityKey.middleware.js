const validateSecurityKey = require("../security/securityKey");

const securityKeyMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  const bearerToken = authorization?.startsWith("Bearer ")
    ? authorization.split(" ")[1]
    : null;

  if (!bearerToken) {
    const error = new Error("Security key is required");
    error.statusCode = 401;
    return next(error);
  }

  if (!validateSecurityKey(bearerToken)) {
    const error = new Error("Invalid security key");
    error.statusCode = 403;
    return next(error);
  }

  next();
};

module.exports = securityKeyMiddleware;
