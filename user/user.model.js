const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "non-binary"] },
    month: { type: String },
    date: { type: Date, default: Date.now() },
    year: { type: Number },
    genre: { type: String, default: "" },
    likedSongs: { type: Array, default: [] },
    playLists: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hash = await bcrypt.hashSync(this.password);
    this.password = hash;

    return next();
  } catch (e) {
    return next(e);
  }
});

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(10).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
    month: Joi.string().required(),
    year: Joi.string().required(),
    gender: Joi.string().required(),
  });
  return schema.validate(user);
};

const User = mongoose.model("user", UserSchema);

module.exports = { User, validate };
