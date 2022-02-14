const express = require("express");
const { registerUser, logInUser } = require("./user.controller");

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(logInUser);

module.exports = userRouter;
