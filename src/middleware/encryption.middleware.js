const { EncryptData, DecryptData } = require("../security/encryption");

const encryptionMiddleware = (req, res, next) => {
  let encryptionMsg = "Encryption failed";
  try {
    // if (process.env.NODE_ENCRYPTION_FLAG !== "true") {
    //   return next();
    // }

    // Decrypt request
    // If body is not a string, reject the request
    if (typeof req.body !== "string") {
      return res.status(400).json(encryptionMsg);
    }

    // Remove unnecessary spaces
    const encryptedData = req.body.trim();

    // Empty body
    if (!encryptedData) {
      return res.status(400).json(encryptionMsg);
    }

    // VALIDATE ENCRYPTED FORMAT
    const parts = encryptedData.split(":");

    // Expected:
    // IV:EncryptedData:AESKey
    if (parts.length !== 3) {
      return res.status(400).json(encryptionMsg);
    }

    // DECRYPT REQUEST
    const decryptedData = DecryptData(encryptedData);

    try {
      req.body = JSON.parse(decryptedData);
    } catch (error) {
      return res.status(400).json(encryptionMsg);
    }

    // Encrypt response

    const originalJson = res.json.bind(res);

    res.json = (data) => {
      const encryptedData = EncryptData(data);

      return originalJson(encryptedData);
    };

    next();
  } catch (error) {
    return res.status(400).json(encryptionMsg);
  }
};

module.exports = encryptionMiddleware;
