const fs = require("fs");
const path = require("path");

const allowedIps = (process.env.NODE_API_ALLOWED_IPS || "")
  .split(",")
  .map((ip) => ip.trim())
  .filter(Boolean);

const ipMiddleware = async (req, res, next) => {
  let clientIp = req.ip;

  if (clientIp.startsWith("::ffff:")) {
    clientIp = clientIp.substring(7);
  }

  if (!allowedIps.includes(clientIp)) {
    const filepath = path.join(__dirname, "../pages/403.html");
    const html = fs.readFileSync(filepath, "utf-8");
    return res.status(403).send(html);
  }

  next();
};

module.exports = ipMiddleware;
