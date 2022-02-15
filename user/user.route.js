const express = require("express");
const { authorize } = require("../utils/middleware/authMiddleware");
const {
  registerUser,
  logInUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("./user.controller");
const { validateUser, validate, validateLogin } = require("./validate.user");

const userRouter = express.Router();

userRouter.route("/register").post(validateUser, validate, registerUser);
userRouter.route("/login").post(validateLogin, logInUser);
userRouter.route("/get-all").get(getUsers);
userRouter.route("/get-one").get(authorize, getUser);
userRouter.route("/remove").delete(authorize, deleteUser);
userRouter.route("/edit").put(authorize, updateUser);

module.exports = userRouter;
