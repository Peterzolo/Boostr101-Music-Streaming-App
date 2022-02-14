const express = require("express");
const { registerUser, logInUser } = require("./user.controller");
const { validateUser, validate } = require("./validate.user");

const userRouter = express.Router();

userRouter.route("/register").post(validateUser,validate, registerUser);
userRouter.route("/login").post(logInUser);

module.exports = userRouter;
