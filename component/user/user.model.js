const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary"],
      required: true,
    },
    month: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    year: { type: Number, required: true },
    genre: { type: String, default: "" },
    likedSongs: { type: Array, default: [] },
    song: [
      {
        type: Schema.Types.ObjectId,
        ref: "song",
        required: true,
      },
    ],
    playLists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "playList",
        required: true,
      },
    ],
    isAdmin: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
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

const User = mongoose.model("user", UserSchema);

module.exports = User;
