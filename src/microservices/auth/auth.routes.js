const Api = require("../../network/api");
const { loginController, registerController } = require("./auth.controller");
const {
  registerModel,
  loginModel,
  authenticateModel,
} = require("../../models/auth.model");

Api.post(
  "/register",
  {
    FieldValidation: registerModel,
  },
  registerController,
);

Api.post(
  "/login",
  {
    FieldValidation: loginModel,
  },
  loginController,
);

Api.post("/authenticate", {
  FieldValidation: authenticateModel,
  auth: true,
});
Api.post("/listing", {
  FieldValidation: authenticateModel,
  auth: true,
  encryption: true,
});

module.exports = Api.router;
