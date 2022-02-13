const User = require("./user.model");
const userError = require("./userError");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/middleware/jwtToken");
const { validate } = require("./validate.user");


exports.registerUser = async (req, res) => {
  const { error } = validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
  const {
    name,
    email,
    password,
    gender,
    month,
    date,
    year,
    likedSongs,
    playLists,
    isAdmin,
  } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw userError.UserExists();
    }
    const salt = bcrypt.genSalt(process.env.HASSHING_SALT);
    const hashedPassword = bcrypt.hash(password, hash);
    let newUser = await new User({
      name,
      email,
      password: hashedPassword,
      gender,
      month,
      date,
      year,
      likedSongs,
      playLists,
      isAdmin,
    });

    await newUser.save();
    const token = generateToken({ id: newUser._id, email: newUser.email });
     newUser.password = undefined
    res.status(200).json({
      Success: true,
      constent: {newUser,token},
      message: "User successfully added",
    });
  } catch (error) {}
};
