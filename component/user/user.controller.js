const userError = require("./userError");
const bcrypt = require("bcryptjs");
const userService = require("./user.service");
const { validationResult } = require("express-validator");

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
    const userExist = await userService.userExists({ email });
    console.log("userExist", userExist);
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

    //   const { password, ...others } = newUser._doc;

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
  const users = await userService.fetchAllUsers();
  res.status(200).json({
    success: true,
    message: "Users successfully fetched",
    content: users,
  });
};

exports.getAUser = async (req, res) => {
  let email = req.user.email;
  console.log("EMAIL", email);
  const user = await userService.fetchAuser({email});

  if (!user) {
    throw userError.NotFound();
  }
  const foundUser = user;

  res.status(200).json({
    success: true,
    message: "User successfully fetched",
    content: foundUser,
  });
};

// exports.getUser = async (req, res) => {
//   try {
//     let email = req.user.email;
//     console.log("User email", email);
//     const user = await User.findOne({ status: "active", email });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     res.status(202).json({
//       Success: true,
//       message: "User successfully fetched",
//       data: user,
//     });
//     console.log("USER RESPONSE", user);
//   } catch (error) {
//     res.status(500).json({ message: "Could not fetch user", error });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     let email = req.user.email;
//     const user = await User.findOne({ email });
//     if (!user) {
//       throw userError.NotFound();
//     }
//     const query = email;
//     const deletedUser = await User.findOneAndUpdate(
//       { email: query },
//       { $set: { status: "inactive" } },
//       { new: true }
//     );
//     res.status(202).json({
//       success: true,
//       message: "Successfully deleted user",
//       user: deletedUser,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Could not fetch user", error });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     let email = req.user.email;
//     const editObject = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       throw userError.NotFound();
//     }
//     const query = email;
//     const update = editObject;
//     const updatedUser = await User.findOneAndUpdate(
//       { email: query },
//       { $set: update },
//       { new: true }
//     );
//     res.status(202).json({
//       success: true,
//       message: "Successfully updated user",
//       user: updatedUser,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Could not fetch user", error });
//   }
// };
