const express = require("express");
const userRouter = express.Router();

const { authorize } = require("../../utils/middleware/authMiddleware");
const {adminAuth} = require("../../utils/middleware/adminMiddleware")
const {
  registerUser,
  logInUser,
  deleteUser,
  updateUser,
  getAUser,
  getAllUsers,
} = require("./user.controller");
const { validateLogin, validateRes, validateUser } = require("./validate.user");

userRouter.route("/register").post(validateRes, validateUser, registerUser);
userRouter.route("/login").post(validateLogin, validateRes, logInUser);
userRouter.route("/get-all").get(adminAuth, getAllUsers);
userRouter.route("/get-one").get(authorize, getAUser);
userRouter.route("/edit").put(authorize, updateUser);
userRouter.route("/remove").delete(authorize, deleteUser);

module.exports = userRouter;
