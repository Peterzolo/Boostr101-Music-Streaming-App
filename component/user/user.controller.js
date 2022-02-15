const userError = require("./userError");
const bcrypt = require("bcryptjs");
const userService = require("./user.service");

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
  console.log('userExist',userExist)
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

// exports.logInUser = async (req, res) => {
//   const body = req.body;
//   try {
//     const user = await User.findOne({ email: body.email });
//     if (!user) {
//       throw userError.InvalidInput();
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(body.password, salt);

//     const isValidPassword = await bcrypt.compare(body.password, user.password);
//     if (!isValidPassword) {
//       throw userError.InvalidInput();
//     }

//     const token = generateToken({
//       id: user._id,
//       email: user.email,
//       name: user.name,
//     });
//     const { password, ...others } = user._doc;
//     res.status(201).send({
//       Success: true,
//       AccessToken: token,
//       others,
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find({ status: "active" }).select("-password");
//     if (!users.length) {
//       throw userError.NotFound();
//     }
//     res.status(200).json({
//       success: true,
//       data: users,
//       message: "Users successfully found",
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error occured", error });
//   }
// };

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
