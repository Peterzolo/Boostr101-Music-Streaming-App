const userError = require("./userError");
const bcrypt = require("bcryptjs");
const userService = require("./user.service");
const { validationResult } = require("express-validator");
const User = require("./user.model");

exports.registerUser = async (req, res) => {
  let {
    user,
    name,
    email,
    password,
    gender,
    month,
    date,
    year,
    song,
    genre,
    likedSongs,
    playList,
    isAdmin,
    status,
  } = req.body;

  try {
    const userExist = await userService.findUser({ email });
    if (userExist) {
      throw userError.UserExists();
    }
    const newUser = await userService.userSignUp({
      user,
      name,
      email,
      password,
      gender,
      month,
      date,
      year,
      song,
      genre,
      likedSongs,
      playList,
      isAdmin,
      status,
    });

    res.status(200).send({
      success: true,
      content: newUser,
      message: "User successfully added",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.logInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.signInUser(email, password);

    res.status(200).json({
      success: true,
      message: "User logged in successffully",
      content: user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllUsers = async (req, res) => {

  let user = req.user.isAdmin;

  console.log('ADMIN',user)
  
  const users = await userService.fetchAllUsers();
  res.status(200).json({
    success: true,
    message: "Users successfully fetched",
    content: users,
  });
};


exports.getAUser = async (req, res) => {
  try {
    let email = req.user.email;

    const user = await userService.findUser({ email });
    if (!user) {
      throw userError.NotFound();
    }

    const userEmail = email;
    const foundUser = await userService.fetchAUser({ userEmail });

    res.status(200).json({
      success: true,
      message: "user loaded",
      content: foundUser,
    });
  } catch (error) {
    res.status(500).json("unable to load user");
  }
};

exports.updateUser = async (req, res) => {
  const email = req.user.email;
  const updateData = req.body;

  const findUser = await userService.findUser({ email });
  if (!findUser) {
    throw userError.NotFound();
  }

  const query = email;
  const update = updateData;

  const updatedUser = await userService.editUser(query, update);

  res.status(200).json({
    success: true,
    message: "User successfully updated",
    content: updatedUser,
  });
};

exports.deleteUser = async (req, res) => {
  const email = req.user.email;

  const findUser = await userService.findUser({ email });
  if (!findUser) {
    throw userError.NotFound();
  }

  const query = email;

  const deletedUser = await userService.removeUser(query);

  res.status(200).json({
    success: true,
    message: "User successfully updated",
    content: deletedUser,
  });
  console.log(deletedUser);
};
