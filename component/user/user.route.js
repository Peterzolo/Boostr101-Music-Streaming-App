const express = require("express");
const userRouter = express.Router();

const {authorize} = require('../../utils/middleware/authMiddleware');
const {
  registerUser,
  logInUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("./user.controller");

const { validateUser, validate, validateLogin } = require("./validate.user");
const userController = require('./user.controller')


userRouter.route("/register").post( registerUser);
// userRouter.route("/login").post(validateLogin, logInUser);
// userRouter.route("/get-all").get(getUsers);
// userRouter.route("/get-one").get(authorize, getUser);
// userRouter.route("/remove").delete(authorize, deleteUser);
// userRouter.route("/edit").put(authorize, updateUser);


module.exports = userRouter;
