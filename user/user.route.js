const express = require("express");
const { authorize } = require("../utils/middleware/authMiddleware");
const { registerUser, logInUser, getUsers } = require("./user.controller");
const { validateUser, validate } = require("./validate.user");

const userRouter = express.Router();

userRouter.route("/register").post(validateUser, validate, registerUser);
userRouter.route("/login").post(logInUser);
userRouter.route("/get-all").get(authorize, getUsers);

module.exports = userRouter;
