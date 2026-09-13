const crypto = require("crypto");

const validateSecurityKey = (providedKey) => {

  const expectedKey = process.env.NODE_API_SECURITY_KEY;

  if (!providedKey || !expectedKey) {
    return false;
  }

  const providedBuffer = Buffer.from(providedKey);
  const expectedBuffer = Buffer.from(expectedKey);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
};

module.exports = validateSecurityKey;