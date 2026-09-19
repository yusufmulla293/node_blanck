const jwt = require("jsonwebtoken");

const jwtServices = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.identifier,
    },
    process.env.NODE_JWT_SECRET,
    {
      expiresIn: process.env.NODE_JWT_EXPIRES_IN,
    },
  );

  return token;
};

module.exports = jwtServices;
