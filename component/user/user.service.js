const User = require("./user.model");
const { generateToken } = require("../../utils/middleware/jwtToken");
const jwt = require("jsonwebtoken");
const userError = require("./userError");
const bcrypt = require("bcryptjs");

exports.userExists = async ({ email }) => {
  const existedUser = await User.findOne({ status: "active", email }).select(
    "-password"
  );
  return existedUser;
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
  // const salt = bcrypt.genSalt(10);
  // const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.findOne({ email });
  if (!user) {
    throw userError.NotFound();
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    throw userError.InvalidInput();
  }

  // const token = jwt.sign(
  //   { email: user.email, id: user._id },
  //   process.env.JWT_SECRET,
  //   { expiresIn: "1d" }
  // );

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
