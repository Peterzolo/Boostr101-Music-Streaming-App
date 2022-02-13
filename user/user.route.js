const express = require("express");
const { registerUser } = require("./user.controller");

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);

module.exports = userRouter;
