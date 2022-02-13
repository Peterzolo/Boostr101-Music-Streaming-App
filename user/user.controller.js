const userError = require("./userError");

const User = require("./user.model");
const { validate } = require("./user.model");
const { generateToken } = require("../utils/middleware/jwtToken");

exports.registerUser = async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const userObject = {
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

    res.status(200).send({
      success: true,
      accessToken: token,
      content: savedData,
      message: "User successfully added",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
