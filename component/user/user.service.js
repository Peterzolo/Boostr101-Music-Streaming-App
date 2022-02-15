const User = require("./user.model");
const { generateToken } = require("../../utils/middleware/jwtToken");
const jwt = require("jsonwebtoken");

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
