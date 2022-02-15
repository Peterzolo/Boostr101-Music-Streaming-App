const express = require("express");
const userRouter = express.Router();

const { authorize } = require("../../utils/middleware/authMiddleware");
const {
  registerUser,
  logInUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getAUser,
  getAllUsers,
} = require("./user.controller");
const { validate } = require("./user.model");
const { validateLogin, validateRes, validateUser } = require("./validate.user");

userRouter.route("/register").post(validate, validateUser, registerUser);
userRouter.route("/login").post(validateLogin, validateRes, logInUser);
userRouter.route("/get-all").get(getAllUsers);
userRouter.route("/get-one").get(authorize, getAUser);
userRouter.route("/edit").put(authorize, updateUser);
// userRouter.route("/remove").delete(authorize, deleteUser);

module.exports = userRouter;
