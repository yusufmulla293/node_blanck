const Api = require("../../network/api");
const { testController } = require("./test.controller");


//test API
Api.get(
  "/test",
  {
    // encryption: true,
  },
  testController,
);


module.exports = Api.router;
