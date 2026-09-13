const jwtServices = require("../../services/jwt/jwt.services");
const { registerUser, loginUser } = require("./auth.services");

const registerController = async (req, res, next) => {
  try {
    const { identifier } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    const identifierType = emailRegex.test(identifier)
      ? "email"
      : mobileRegex.test(identifier)
        ? "mobile"
        : null;

    if (!identifierType) {
      const error = new Error("Invalid ID");
      error.statusCode = 400;
      return next(error);
    }

    const user = await registerUser(identifier, identifierType);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { identifier } = req.body;

    const user = await loginUser(identifier);

    const token = jwtServices(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: user.username,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginController, registerController };
