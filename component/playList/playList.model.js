const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayListSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    name: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    desc: {
      type: String,
      default: "",
    },

    songs: {
      type: Array,
      default: [],
    },
    img: { type: String },
  },
  { timestamps: true }
);

const PlayList = mongoose.model("playList", PlayListSchema);

module.exports = PlayList;
