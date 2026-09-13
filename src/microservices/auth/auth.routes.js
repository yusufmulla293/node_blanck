const Api = require("../../network/api");
const { loginController, registerController } = require("./auth.controller");
const { registerModel, loginModel } = require('../../models/auth.model')

Api.post(
  "/register",
  {
    validation: registerModel,
  },
  registerController,
);

Api.post(
  "/login",
  {
    validation: loginModel,
  },
  loginController,
);

Api.post("/authenticate", {
  auth: true,
});

module.exports = Api.router;
