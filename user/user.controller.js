const userError = require("./userError");
const bcrypt = require("bcryptjs");
const { User, validate } = require("./user.model");

const { generateToken } = require("../utils/middleware/jwtToken");
const res = require("express/lib/response");

exports.registerUser = async (req, res) => {
  try {
    const userObject = {
      status: req.body.status,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      month: req.body.month,
      date: req.body.date,
      year: req.body.year,
      genre: req.body.genre,
      likedSongs: req.body.likedSongs,
      playLists: req.body.playLists,
      isAdmin: req.body.isAdmin,
    };
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw userError.UserExists();
    }

    const newUser = await new User(userObject);

    const savedData = await newUser.save();

    const token = generateToken({ id: savedData._id, email: savedData.email });

    const { password, ...others } = savedData._doc;

    res.status(200).send({
      success: true,
      accessToken: token,
      content: others,
      message: "User successfully added",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.logInUser = async (req, res) => {
  // const { email, password } = req.body;
  const body = req.body;
  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      throw userError.InvalidInput();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword) {
      throw userError.InvalidInput();
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
    });
    const { password, ...others } = user._doc;
    res.status(201).send({
      Success: true,
      AccessToken: token,
      others,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "active" }).select("-password");
    if (!users.length) {
      throw userError.NotFound();
    }
    res.status(200).json({
      success: true,
      data: users,
      message: "Users successfully found",
    });
  } catch (error) {
    res.status(500).json({ message: "Error occured", error });
  }
};

exports.getUser = async (req, res) => {
  try {
    let email = req.user.email;
    console.log("User email", email);
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    res.status(202).json({
      Success: true,
      message: "User successfully fetched",
      data: user,
    });
    console.log("USER RESPONSE", user);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch user", error });
  }
};
