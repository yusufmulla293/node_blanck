const rateLimit = require("express-rate-limit");

const windowMinutes = Number(process.env.NODE_RATE_LIMIT_WINDOW_MINUTES || 15);
const maxRequests = Number(process.env.NODE_RATE_LIMIT_MAX_REQUESTS || 100);

const rateLimitMiddleware = rateLimit({
  windowMs: windowMinutes * 60 * 1000,
  max: maxRequests,
  message: {
    status: 429,
    message: "Too many requests. Please try again later.",
  },
});

module.exports = rateLimitMiddleware;
