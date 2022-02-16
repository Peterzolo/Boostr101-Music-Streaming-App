const User = require("./user.model");
const { generateToken } = require("../../utils/middleware/jwtToken");
const jwt = require("jsonwebtoken");
const userError = require("./userError");
const bcrypt = require("bcryptjs");

exports.userExisted = async (query) => {
  const existedUser = await User.findOne(query, { status: "active" }).select(
    "-password"
  );
  return existedUser;
};

exports.findUser = async (query) => {
  const user = await User.findOne(query);
  return user;
};

exports.userSignUp = async ({
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
  img,
}) => {
  //   let avatar = await gravatar.url(email, {
  //     s: "200", // Size
  //     r: "pg", // Rating
  //     d: "mm", // Default
  //   });

  let userObject = {
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
    img,
  };

  const newUser = new User(userObject);
  await newUser.save();

  const token = jwt.sign(
    { email: newUser.email, id: newUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // const token = generateToken(newUser.email, newUser._id);

  return {
    accessToken: token,
    user: newUser.user,
    name: newUser.name,
    email: newUser.email,
    // password: newUser.password,
    gender: newUser.gender,
    month: newUser.month,
    date: newUser.date,
    year: newUser.year,
    songs: newUser.songs,
    genre: newUser.genre,
    likedSongs: newUser.likedSongs,
    playList: newUser.playList,
    isAdmin: newUser.isAdmin,
    status: newUser.status,
    img,
  };
};

exports.signInUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw userError.NotFound();
  }

  if (user.status === "inactive") {
    throw userError.NotFound("User not found");
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    throw userError.InvalidInput();
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
    name: user.name,
  });


  return {
    name: user.name,
    email: user.email,
    _id: user._id,
    status: user.status,
    token,
  };

};

exports.fetchAllUsers = async () => {
  const allUsers = await User.find({ status: "active" }).select("-password");
  return allUsers;
};

exports.fetchAUser = async (payload) => {
  const user = await User.findOne(payload, { status: "active" }).select(
    "-password"
  );
  return user;
};

exports.editUser = async (payload, userObject) => {
  const user = await User.findOneAndUpdate(
    payload,
    { $set: userObject },
    { new: true }
  );
  return user;
};

exports.removeUser = async (payload) => {
  const user = await User.findOneAndUpdate(
    payload,
    { $set: { status: "inactive" } },
    { new: true }
  );
  return user;
};
