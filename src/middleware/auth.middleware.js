const jwt = require("jsonwebtoken");

const jwtServices = require("../services/jwt/jwt.services");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.body?.token;
    
    if (!token) {
      const error = new Error("Token is required");
      error.statusCode = 401;
      return next(error);
    }
    
    const decoded = jwt.verify(token, process.env.NODE_JWT_SECRET);
    
    req.user = decoded;
    
    const tokenAge = Math.floor(Date.now() / 1000) - decoded.iat;
    const renewAfter = Number(process.env.NODE_JWT_RENEW_AFTER_MINUTES) * 60;
    
    let responseToken = token;

    if (tokenAge >= renewAfter) {
      responseToken = jwtServices(req.user);
    }

    return res.status(200).json({
      success: true,
      message: "Token is valid",
      user: req.user.username,
      token: responseToken,
    });
  } catch (err) {
    const error = new Error("Invalid or expired token");
    error.statusCode = 401;
    return next(error);
  }
};

module.exports = authMiddleware;
