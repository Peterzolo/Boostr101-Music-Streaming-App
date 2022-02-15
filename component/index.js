const userRoute = require("./user/user.route");
const userService = require("../component/user/user.service");
const userModel = require("../component/user/user.model");

const componentModule = {
  userModule: {
    route: userRoute,
    service: userService,
    model: userModel,
  },
};

module.exports = componentModule;