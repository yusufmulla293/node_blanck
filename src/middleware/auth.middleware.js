const jwt = require("jsonwebtoken");

const jwtServices = require("../services/jwt/jwt.services");

const authMiddleware = (req, res, next) => {
  try {
    // const token = req.body?.token;
    const token = req.cookies?.accessToken;

    if (!token) {
      const error = new Error("Token is required");
      error.statusCode = 401;
      return next(error);
    }

    const decoded = jwt.verify(token, process.env.NODE_JWT_SECRET);
    req.user = decoded;

    const tokenAge = Math.floor(Date.now() / 1000) - decoded.iat;
    const renewAfter = Number(process.env.NODE_JWT_RENEW_AFTER_MINUTES) * 60;

    if (tokenAge >= renewAfter) {
      const responseToken = jwtServices(req.user);

      res.cookie("accessToken", responseToken, {
        httpOnly: true,
        secure: process.env.NODE_API_ENV === "prod",
        sameSite: "lax",
        path: "/",
        maxAge: 15 * 60 * 1000,
      });
    }

    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      error.statusCode = 401;
      error.message = "Invalid access token";
    }

    if (error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Access token expired";
    }

    return next(error);
  }
};

module.exports = authMiddleware;
